import io
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
import re
from reportlab.lib.colors import HexColor

def clean_markdown_tags(text: str) -> str:
    """Helper to convert Markdown to ReportLab tags and escape XML characters."""
    # Escape XML characters
    text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    # Restore bold tags (since we just escaped them)
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    return text

def generate_ats_pdf(md_content: str) -> bytes:
    """Convert Markdown to an ATS-friendly, single-column PDF with executive professional styling."""
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer, 
        pagesize=letter, 
        rightMargin=40, 
        leftMargin=40, 
        topMargin=40, 
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    # Executive Styles
    title_style = ParagraphStyle(
        'ATSTitle',
        parent=styles['Heading1'],
        fontSize=22,
        leading=26,
        spaceAfter=4,
        alignment=TA_LEFT,
        fontName='Helvetica-Bold',
        textColor=HexColor("#0F172A")
    )
    
    contact_style = ParagraphStyle(
        'ATSContact',
        parent=styles['Normal'],
        fontSize=10,
        leading=12,
        spaceAfter=14,
        alignment=TA_LEFT,
        fontName='Helvetica',
        textColor=HexColor("#64748B")
    )
    
    heading_style = ParagraphStyle(
        'ATSHeading',
        parent=styles['Heading2'],
        fontSize=12,
        leading=14,
        spaceBefore=12,
        spaceAfter=8,
        alignment=TA_LEFT,
        fontName='Helvetica-Bold',
        textColor=HexColor("#1E293B"),
        textTransform='uppercase',
        tracking=1
    )
    
    body_style = ParagraphStyle(
        'ATSBody',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        spaceAfter=6,
        alignment=TA_LEFT,
        fontName='Helvetica',
        textColor=HexColor("#334155")
    )
    
    story = []
    
    lines = md_content.split('\n')
    for i, line in enumerate(lines):
        line = line.strip()
        if not line:
            story.append(Spacer(1, 4))
            continue
            
        if line == '---':
            story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#CBD5E1"), spaceBefore=4, spaceAfter=4))
            continue

        if line.startswith('# '):
            text = clean_markdown_tags(line[2:])
            story.append(Paragraph(text, title_style))
        elif line.startswith('## '):
            text = clean_markdown_tags(line[3:])
            story.append(Paragraph(text, heading_style))
        elif line.startswith('### '):
            text = clean_markdown_tags(line[4:])
            story.append(Paragraph(f"<b>{text}</b>", body_style))
        elif line.startswith('- ') or line.startswith('* '):
            text = clean_markdown_tags(line[2:])
            story.append(Paragraph(f"• {text}", body_style))
        else:
            text = clean_markdown_tags(line)
            if i == 1: # Usually contact info
                story.append(Paragraph(text, contact_style))
            else:
                story.append(Paragraph(text, body_style))
            
    doc.build(story)
    return buffer.getvalue()
