from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "satish-kumar-keshav-nagar-header-fixed.pdf"
LOGO = ROOT / "assets" / "pooja-logo.png"


def money(value):
    value = str(int(round(value)))
    if len(value) <= 3:
        grouped = value
    else:
        grouped = value[-3:]
        value = value[:-3]
        while value:
            grouped = value[-2:] + "," + grouped
            value = value[:-2]
    return f"Rs. {grouped}"


def calc(item):
    if item.get("amount") is not None:
        return item["amount"]
    sqft = item.get("sqft")
    if sqft is None:
        sqft = round(float(item.get("width", 0)) * float(item.get("height", 0)), 2)
        item["sqft"] = sqft
    return round(float(sqft) * float(item.get("rate", 0)))


sections = [
    (
        "Foyer Area",
        [
            {"item": "SHOE RACK", "spec": "IN 18 MM PLY AND 1 MM LAMINATE SHOE RACK WITH 2 DRAWERS", "width": 3, "height": 3.6, "rate": 1300},
            {"item": "SITTING NEAR SHOE RACK", "spec": "IN PLY AND LAMINATE WITH STORAGE BELOW", "width": 2, "height": 1.8, "rate": 1300},
            {"item": "SAFTY DOOR", "spec": "IN 25 MM BLOCK BOARD AND 1 MM LAMINATE WITH MS POWDER CATED JALI WITH DESIGNER HANDLE, EUROPA LATCH LOCK", "width": 3.6, "height": 7.2, "rate": 1200},
            {"item": "PANALLING AROUND SAFTY DOOR", "spec": "IN 12 MM PLY AND LAMINATE AS PER DESIGN", "width": 6, "height": 9, "rate": 600},
        ],
    ),
    (
        "Living Room",
        [
            {"item": "CONSOLE UNIT", "spec": "IN 18 MM PLY AND 1 MM LAMINATE SHOE RACK WITH 2 DRAWERS", "width": 5, "height": 3.6, "rate": 1300},
            {"item": "PANALLING ABOVE CONSOLE UNIT", "spec": "IN 12 MM PLY AND LAMINATE WITH WALLPAPER AND MDF MOLDING PANALLING", "width": 5, "height": 6, "rate": 600},
            {"item": "TV UNIT", "spec": "IN 18 MM PLY AND 1 MM LMINATE WITH LIUVERS AND SHOWCASE BOX (VERY MINIMAL)", "width": 8, "height": 8.9, "rate": 1100},
            {"item": "MANDIR BESIDES TV UNIT", "spec": "IN 18 MM PLY AND 1 MM LAMINATE WITH ACRYLIC JALI AND ACRYLIC DESIGN BEHIND(DOORS AND SITTING NOT INCLUDED)", "width": 2.6, "height": 7.6, "rate": 1600},
            {"item": "SOFA", "spec": "IN PINE WOOD FRAME AND BRANDED FAABRIC AND 45 DENSITY FOAM (CUSTOM COUTCH BRAND) 5 SEATER", "amount": 60000},
            {"item": "SOFA BACK WALL", "spec": "IN PLY AND LAMINATE WITH MDF MOLDINGS AND WALLPAPER", "width": 10, "height": 9, "rate": 400},
        ],
    ),
    (
        "Dining Area",
        [
            {"item": "DINING TABLE(4 SEATER)", "spec": "DINING ATBLE MADE BY CARPENTER WITH LAMINATED TOP AND READYMADE CHAIRS", "amount": 56000},
            {"item": "DINING BACK WALL", "spec": "IN PLY AND LAMINATE WITH MDF MOLDINGS AND WALLPAPER", "width": 5, "height": 9, "rate": 500},
        ],
    ),
    (
        "Kitchen",
        [
            {"item": "WALL CABINETS", "spec": "IN 18 MM BWP PLY AND 1 MM INTERNAL LAMINATES AND 1.5 MM ACRYLIC FACTORY FINISHED DOORS", "width": 15, "height": 2.6, "rate": 1600},
            {"item": "LOFT (L SHAPE)", "spec": "IN 18 MM BWP PLY AND 1 MM INTERNAL LAMINATES AND 1.5 MM ACRYLIC FACTORY FINISHED DOORS", "width": 20, "height": 2, "rate": 1600},
        ],
    ),
    (
        "Master Bedroom",
        [
            {"item": "BED", "spec": "IN 18 MM PLY AND 1 MM LAMINATE WITH HYDRAULIC TOP WITH STORAGE", "width": 6, "height": 6.6, "rate": 1100},
            {"item": "BED BACK CUSHION", "spec": "IN FOAM AND FABRIC CUSHION IN SELECTED DESIGN", "width": 6, "height": 2.6, "rate": 600},
            {"item": "BED BACK PANALLING", "spec": "IN PLY AND LAMINATE WITH MDF MOLDINGS AND WALLPAPER DESIGN AS PER SELECTION (PRICE CAN VARY)", "width": 9, "height": 8, "rate": 500},
            {"item": "WARDROBE", "spec": "IN 18 MM PLY AND 1 MM LAMINATE WITH OPENABLE OR SLIDING DOORS WITH HANGER RODS INSIDE, 4 DRAWERS INSIDE", "width": 7, "height": 9, "rate": 1600},
            {"item": "STUDY TABLE WITH OVERHEAD STORAGE", "spec": "IN 18 MM PLY AND 1 MM LAMINATE WITH WRITING BOARD", "width": 3, "height": 7, "rate": 1300},
            {"item": "DRESSING TABLE", "spec": "IN PLYN AND LAMINATE WITH STORAGE AND FULL SIZE MIRROR AND 2 DRAWERS", "width": 2, "height": 7, "rate": 1600},
            {"item": "SIDE TABLE", "spec": "IN PLY AND LAMINATE WITH 2 DRAWERS", "amount": 6000},
        ],
    ),
    (
        "Master Bedroom Bathroom",
        [
            {"item": "GLASS PARTITION", "spec": "10 MM TOUGHNED GLASS PARTITION", "width": 2.6, "height": 7, "rate": 600},
            {"item": "PVC CEILING", "spec": "PVC CEILING IN BATHROOM", "width": 8, "height": 4.6, "rate": 160},
            {"item": "STORAGE UNDER SINK", "spec": "IN PVC PLY AND LAMINATE", "width": 2, "height": 2, "rate": 1500},
            {"item": "MIRROR", "spec": "MIRROR WITH ALLUMINIUM FRAME WITH LED LIGHT", "amount": 5000},
        ],
    ),
    (
        "Guest Bedroom",
        [
            {"item": "BED", "spec": "18 MM PLY AND 1 MM LAMINATE BED WITH HYDROLIC STORAGE", "width": 5, "height": 6.6, "rate": 1100},
            {"item": "BED BACK CUSHION", "spec": "IN FOAM AND FABRIC CUSHION IN SELECTED DESIGN", "width": 5, "height": 2.6, "rate": 600},
            {"item": "BED BACK PANALLING", "spec": "IN PLY AND LAMINATE WITH MDF MOLDINGS AND WALLPAPER DESIGN AS PER SELECTION (PRICE CAN VARY)", "width": 9, "height": 8, "rate": 500},
            {"item": "WARDROBE", "spec": "IN 18 MM PLY AND 1 MM LAMINATE WITH OPENABLE OR SLIDING DOORS WITH HANGER RODS INSIDE, 4 DRAWERS INSIDE", "width": 6, "height": 9, "rate": 1600},
            {"item": "STUDY TABLE WITH OVERHEAD STORAGE", "spec": "IN 18 MM PLY AND 1 MM LAMINATE WITH WRITING BOARD", "width": 3, "height": 7, "rate": 1300},
            {"item": "DRESSING TABLE", "spec": "IN PLYN AND LAMINATE WITH STORAGE AND FULL SIZE MIRROR AND 2 DRAWERS", "width": 2, "height": 7, "rate": 1600},
            {"item": "SIDE TABLE", "spec": "IN PLY AND LAMINATE WITH 2 DRAWERS", "amount": 6000},
        ],
    ),
    (
        "Kids Bedroom",
        [
            {"item": "SOFA CUM BED", "spec": "FOLDABLE SOFA CUM BED IN PLY AND LAMINATE", "width": 5, "height": 6.6, "rate": 1200},
            {"item": "WARDROBE", "spec": "IN 18 MM PLY AND 1 MM LAMINATE WITH SLIDING DOORS OR OPENABLLE DOORS WITH 4 DRAWERS AND HANGER RODS", "width": 6, "height": 9, "rate": 1600},
            {"item": "BED BACK CUSHION", "spec": "IN FOAM AND FABRIC CUSHION IN SELECTED DESIGN", "width": 5, "height": 2.6, "rate": 600},
            {"item": "DRESSING TABLE", "spec": "IN PLYN AND LAMINATE WITH STORAGE AND FULL SIZE MIRROR AND 2 DRAWERS", "width": 2, "height": 7, "rate": 1600},
            {"item": "SIDE TABLE", "spec": "IN PLY AND LAMINATE WITH 2 DRAWERS", "amount": 6000},
        ],
    ),
    (
        "Common Bathroom",
        [
            {"item": "GLASS PARTITION", "spec": "10 MM TOUGHNED GLASS PARTITION", "width": 2.6, "height": 7, "rate": 600},
            {"item": "PVC CEILING", "spec": "PVC CEILING IN BATHROOM", "width": 8, "height": 4.6, "rate": 160},
            {"item": "STORAGE UNDER SINK", "spec": "IN PVC PLY AND LAMINATE", "width": 2, "height": 2, "rate": 1500},
            {"item": "MIRROR", "spec": "MIRROR WITH ALLUMINIUM FRAME WITH LED LIGHT", "amount": 5000},
        ],
    ),
    (
        "Other Items",
        [
            {"item": "FALSE CEILING", "spec": "POP IN GYPROC GYPSUM SHEET WITH PREMIUM QUALITY CAHNNEL", "sqft": 1122, "rate": 80},
            {"item": "INVERTER BOX", "spec": "MS GRILL AT BASE WITH PLY COVERING AND 1 MM LAMINATE FINISHED WITH JALI FOR VENTILATION", "width": 4, "height": 2.3, "rate": 1400},
            {"item": "INVISIBLE GRILL", "spec": "2 MM THICKNESS WITH 2.5 INCH GAP INVISIBLE GRILL 95 SQFT", "sqft": 95, "rate": 140},
            {"item": "ELECTRIC POINT SHIFTNIG", "spec": "ELECTRIC POINTS SHIFTING FOR FALSE CEILING AND FURNITURE (POINTS CAN VARY AS PER REQUIREMENT)", "sqft": 80, "rate": 800},
            {"item": "LIGHTS,LEDS, CHOKE, SPOT LIGHTS, PROFILE LIGHTS", "spec": "LIGHTS COST LIKE SPOT LIGHT, PROFILE LIHGHTS, PANAL LIGHTS OF BRAND ORIENT OR BAJAJ, LED", "amount": 45000},
            {"item": "SWITCH SOCKET FOR EXTRA LIGHTS POINT", "spec": "EXTRA SWITCH AND SOCKETS FOR EXTRA LIGHT POINTS EXCEPT EXISTING SWITCH SOCKETS", "amount": 14000},
            {"item": "DEBRIES TRANSPORT AND DUMPING", "spec": "", "amount": 12000},
            {"item": "DEEP CLEANING", "spec": "", "amount": 8000},
            {"item": "PAINT", "spec": "ASIAN PAINT LUSTER WITH 2 COAT PUTTI, 2 COAT PRIMER AND 2 COAT PAINT", "amount": 85000},
        ],
    ),
]

materials = [
    "All material used by us is ISI trademarked.",
    "Ply wood /Blockboard - 18mm alternate gurjan plywood for furniture work, 18mm BWR plywood for all kitchen work.",
    "Laminate - 1mm thickness laminate to be used for furniture. Standard laminate rate for outside laminates of Rs.1800 to 2200 per sheet has been considered (1 mm laminate considered to all furniture) premium fluted, smooth finish, stone finish, self design laminates will be used.",
    "Additional accessories as well as light fittings have not been included in the quote.",
    "All hinges are soft closure for kitchen, living, dinning, entry passage, others unit like overhead loft storage. ONYX (NON SOFT CLOSE) drawers channals will be used.",
    "PREMIUM EMULSION paint of asian paint to be used for all walls AND premium emulsion for CEILING.",
    "Hardware and Hinges - ONYX(soft close) for hinges.",
    "Europa for wardrobe locks.",
    "The interior work included edge binding to give better finish.",
    "Laminates inside are white / off white/ fabric finish of 1 mm thickness.",
]

payment_slabs = [
    ("ADVANCE", "This is for design phase", "50,000"),
    ("1ST SLAB", "In this slab all pop work will be finish, plywood, internal laminate, fevicol and basic hardware will be deliverd on site and pasting of laminate will be done", "30%"),
    ("2ND SLAB", "In this slab all carcus work will be finished, and hardware like hinges, chanells will be deliverd on site, civil work will be done", "25%"),
    ("3 RD SLAB", "In this slab all kitchen material order will be places, all color laminate, bed fittings, warddrobe fittings will be deliverd on site and laminate work will start", "25%"),
    ("4TH SLAB", "In this slab all color laminate work finish, all pending works", "15%"),
    ("5TH SLAB", "This slab is after handover, design cost will minimise from this slab", "5%"),
    ("TOTAL", "", "100%"),
]


def para(text, style):
    return Paragraph(str(text).replace("&", "&amp;"), style)


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=13 * mm,
        leftMargin=13 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title="Satish Kumar - KESHAV NAGAR Quotation",
        author="Pooja Interiors",
    )
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="Small", parent=styles["Normal"], fontSize=7.5, leading=9.2, textColor=colors.HexColor("#433832")))
    styles.add(ParagraphStyle(name="Tiny", parent=styles["Normal"], fontSize=7, leading=8.4, textColor=colors.HexColor("#433832")))
    styles.add(ParagraphStyle(name="Section", parent=styles["Heading3"], fontSize=10.5, leading=12, textColor=colors.white, spaceAfter=0))
    styles.add(ParagraphStyle(name="TitleRight", parent=styles["Normal"], fontSize=8.5, leading=10.5, alignment=TA_RIGHT, textColor=colors.HexColor("#6c625c")))
    styles.add(ParagraphStyle(name="QuoteTitle", parent=styles["Title"], fontName="Times-Bold", fontSize=22, leading=25, alignment=TA_LEFT, textColor=colors.HexColor("#2f2925")))
    styles.add(ParagraphStyle(name="Tagline", parent=styles["Small"], fontSize=8.8, leading=11, textColor=colors.HexColor("#8a5f44"), fontName="Helvetica-Oblique"))
    styles.add(ParagraphStyle(name="DetailHead", parent=styles["Small"], fontSize=8.2, leading=9.5, alignment=TA_CENTER, textColor=colors.HexColor("#4c463f"), fontName="Helvetica-Bold"))
    styles.add(ParagraphStyle(name="DetailLabel", parent=styles["Small"], fontSize=7.4, leading=8.6, alignment=TA_RIGHT, textColor=colors.HexColor("#5f554f"), fontName="Helvetica-Bold"))
    styles.add(ParagraphStyle(name="DetailValue", parent=styles["Small"], fontSize=7.4, leading=8.6, textColor=colors.HexColor("#2f2925"), fontName="Helvetica"))
    styles.add(ParagraphStyle(name="CenterSmall", parent=styles["Small"], alignment=TA_CENTER))

    grand_base = sum(calc(row) for _, rows in sections for row in rows)
    designer_fee = round(grand_base * 0.06)
    grand_total = grand_base + designer_fee

    story = []
    logo = Image(str(LOGO), width=26 * mm, height=16.48 * mm)
    header = Table(
        [
            [
                logo,
                [
                    para("Interiors by Pooja", styles["QuoteTitle"]),
                    para("Turning spaces into stories you'll love", styles["Tagline"]),
                ],
                [
                    para("<b>Date:</b> 2026-10-11", styles["TitleRight"]),
                    para(f"<b>Grand Total:</b> {money(grand_total)}", styles["TitleRight"]),
                ],
            ]
        ],
        colWidths=[34 * mm, 71 * mm, 78 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LINEBELOW", (0, 0), (-1, -1), 0.7, colors.HexColor("#e2d8ce")),
            ]
        )
    )
    story.extend([header, Spacer(1, 10)])

    connected_details = Table(
        [
            [para("Client's Details", styles["DetailHead"]), "", para("Company Details", styles["DetailHead"]), ""],
            [
                para("Name:", styles["DetailLabel"]),
                para("Satish Kumar", styles["DetailValue"]),
                para("Contact:", styles["DetailLabel"]),
                para("8483846288", styles["DetailValue"]),
            ],
            [
                para("Project Address:", styles["DetailLabel"]),
                para("KESHAV NAGAR", styles["DetailValue"]),
                para("Office Address:", styles["DetailLabel"]),
                para("Que914, C-1802, Keshav Nagar, Mundhwa, Pune, Maharashtra 411036", styles["DetailValue"]),
            ],
        ],
        colWidths=[30 * mm, 62 * mm, 30 * mm, 62 * mm],
        rowHeights=[8 * mm, 8.5 * mm, 12 * mm],
    )
    connected_details.setStyle(
        TableStyle(
            [
                ("SPAN", (0, 0), (1, 0)),
                ("SPAN", (2, 0), (3, 0)),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#f2eee9")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#fffaf4")),
                ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#d8ccc2")),
                ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#a95d3e")),
                ("LINEBEFORE", (2, 0), (2, -1), 0.8, colors.HexColor("#a95d3e")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    details_rule = Table([[""]], colWidths=[184 * mm], rowHeights=[1.2 * mm])
    details_rule.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#a95d3e"))]))
    story.extend([connected_details, Spacer(1, 5), details_rule, Spacer(1, 8)])

    for section_name, rows in sections:
        section_total = sum(calc(row) for row in rows)
        data = [[para(section_name, styles["Section"]), "", "", "", "", "", ""]]
        data.append(
            [
                para("Item", styles["Tiny"]),
                para("Specifications", styles["Tiny"]),
                para("Width", styles["Tiny"]),
                para("Height", styles["Tiny"]),
                para("Total sq. ft.", styles["Tiny"]),
                para("Rate", styles["Tiny"]),
                para("Amount", styles["Tiny"]),
            ]
        )
        for row in rows:
            amount = calc(row)
            data.append(
                [
                    para(row["item"], styles["Small"]),
                    para(row.get("spec", ""), styles["Small"]),
                    row.get("width", ""),
                    row.get("height", ""),
                    row.get("sqft", ""),
                    row.get("rate", ""),
                    money(amount),
                ]
            )
        data.append(["", "", "", "", "", para("<b>Section Total</b>", styles["Tiny"]), para(f"<b>{money(section_total)}</b>", styles["Tiny"])])
        table = Table(data, colWidths=[33 * mm, 66 * mm, 14 * mm, 14 * mm, 18 * mm, 17 * mm, 22 * mm], repeatRows=2)
        table.setStyle(
            TableStyle(
                [
                    ("SPAN", (0, 0), (-1, 0)),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#a95d3e")),
                    ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#f5eee7")),
                    ("TEXTCOLOR", (0, 1), (-1, 1), colors.HexColor("#6c625c")),
                    ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#e2d8ce")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("ALIGN", (2, 2), (-1, -1), "RIGHT"),
                    ("FONTNAME", (2, 2), (-1, -1), "Helvetica"),
                    ("FONTSIZE", (2, 2), (-1, -1), 7.2),
                    ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#fffaf4")),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ]
            )
        )
        story.extend([KeepTogether([table]), Spacer(1, 8)])

    totals = Table(
        [
            ["Work Total", money(grand_base)],
            ["Designer Fees 6%", money(designer_fee)],
            ["Grand Total", money(grand_total)],
        ],
        colWidths=[45 * mm, 35 * mm],
        hAlign="RIGHT",
    )
    totals.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#e2d8ce")),
                ("BACKGROUND", (0, 2), (-1, 2), colors.HexColor("#fff3e9")),
                ("TEXTCOLOR", (0, 2), (-1, 2), colors.HexColor("#a95d3e")),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("ALIGN", (1, 0), (1, -1), "RIGHT"),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.extend([totals, PageBreak()])

    material_table = Table([[para("Specifications of Materials", styles["Section"])], [para("<br/>".join(materials), styles["Small"])]], colWidths=[184 * mm])
    material_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#68786c")),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#e2d8ce")),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.extend([material_table, Spacer(1, 8)])

    slab_data = [[para("Payment Slab", styles["Tiny"]), para("Details", styles["Tiny"]), para("Value", styles["Tiny"])]]
    for title, desc, value in payment_slabs:
        slab_data.append([para(title, styles["Small"]), para(desc, styles["Small"]), para(value, styles["Small"])])
    slab_table = Table(slab_data, colWidths=[28 * mm, 128 * mm, 28 * mm])
    slab_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#f5eee7")),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#e2d8ce")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (2, 1), (2, -1), "RIGHT"),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(slab_table)
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#7a716b"))
    canvas.drawImage(str(LOGO), 13 * mm, 5.5 * mm, width=10 * mm, height=6.34 * mm, mask="auto")
    canvas.drawString(25 * mm, 8 * mm, "Pooja Interiors | Interior Quotation")
    canvas.drawRightString(A4[0] - 13 * mm, 8 * mm, f"Page {doc.page}")
    canvas.restoreState()


if __name__ == "__main__":
    build()
    print(OUTPUT)
