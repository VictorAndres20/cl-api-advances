import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { Advance } from 'src/api/advance/entity/advance.entity';

const font_size = 10;

const start_pos_y = 40;
const posYAddition = 20;

export const buildPDFAdvanceDoc = (pathFile: string, advance: Advance): Promise<boolean> => {
    return new Promise((resolve, reject) => {        
        let writeStream = fs.createWriteStream(`${pathFile}`);         
        let doc = new PDFDocument();
        doc.pipe(writeStream);

        let posY = writeHeader(doc, advance, start_pos_y);
        posY = validateAdditionPage(doc, posY);
        posY = writeDetail(doc, advance, posY);

        finishPDFDocument(doc);
        writeStream.on('finish', function (err: Error) {
            if(err)
                reject(err);
            else
                resolve(true);
        });
    });
}

export const validateAdditionPage = (doc: typeof PDFDocument, posY: number): number => {
    if(posY >= 700) {
        addPDFPage(doc);
        posY = 100;
    }
    return posY;
}

export const writeImageHeader = (doc: typeof PDFDocument, posY: number, fitW: number, fitH: number, posYAddition: number) => {
    writeImagePDFDoc(doc, './logo_cinta.png', 10, posY, fitW, fitH);
}

export const writeHeader = (doc: typeof PDFDocument, advance: Advance, posYParam: number): number => {    
    let dateCreated = advance.created_date ? advance.created_date.toISOString().split("T")[0] : null;
    let dateApproved = advance.approved_date ? advance.approved_date.toISOString().split("T")[0] : 'SIN TRANSFERIR';
    let employee = advance.employee;
    let posY = posYParam;
    const fitW = 300;
    const fitH = 50;
    const l_pos_x = 60;
    const r_pos_x = 310;
    //writeImagePDFDoc(doc, './cintalast_logo.png', 10, posY, fitW, fitH);    
    //writeImageHeader(doc, posY, fitW, fitH, posYAddition);
    writeBoldPDFDoc(doc, `COMPROBANTE`, r_pos_x - 70, posY, font_size + 3);
    writeBoldPDFDoc(doc, `SOLICITUD DE`, r_pos_x + 15 - 70, posY + posYAddition, font_size);
    writeBoldPDFDoc(doc, `ANTICIPO`, r_pos_x + 26 - 70, posY + posYAddition * 2, font_size);
    posY += (posYAddition * 4) + fitH;
    writeBoldPDFDoc(doc, `Fecha de solicitud: ${dateCreated}`, l_pos_x, posY, font_size);
    writeBoldPDFDoc(doc, `Fecha de transferencia: ${dateApproved}`, r_pos_x, posY, font_size);
    posY += posYAddition;
    writeBoldPDFDoc(doc, `Nombre del solicitante: ${employee?.name}`, l_pos_x, posY, font_size);
    writeBoldPDFDoc(doc, `Cédula del solicitante: ${employee?.id}`, r_pos_x, posY, font_size);
    posY += posYAddition;
    writeBoldPDFDoc(doc, `Empresa asociada: ${employee?.range?.enterprise?.name}`, l_pos_x, posY, font_size);
    writeBoldPDFDoc(doc, `NIT empresa asociada: ${employee?.range?.enterprise?.id}`, r_pos_x, posY, font_size);
    posY += posYAddition * 4;
    return posY;
}

export const writeDetail = (doc: typeof PDFDocument, advance: Advance, posYParam: number): number => {    
    let posY = posYParam;
    const pos_x = 150;
    writeBoldPDFDoc(doc, `Detalle de solicitud:`, pos_x - 50, posY, font_size);
    posY += posYAddition * 2;
    writePDFDoc(doc, `Valor de la solicitud ....................................... ${advance.value}`, pos_x + 21, posY, font_size);   
    posY += posYAddition;
    writePDFDoc(doc, `Costo de la solicitud ....................................... ${advance.cost}`, pos_x + 21, posY, font_size);   
    posY += posYAddition;
    writePDFDoc(doc, `Total a descontar ........................................... ${Number(advance.value) + Number(advance.cost)}`, pos_x + 21, posY, font_size);   
    posY += posYAddition * 4;
    writeBoldPDFDoc(doc, `ESTE COMPROBANTE ES GENERADO AUTOMÁTICAMENTE AL CONFIRMAR LA`, pos_x - 50, posY, font_size);
    posY += posYAddition;
    writeBoldPDFDoc(doc, `SOLICITUD, TENIENDO CONOCIMIENTO DEL COSTO Y DEL DESCUENTO QUE SE`, pos_x - 50, posY, font_size);
    posY += posYAddition;
    writeBoldPDFDoc(doc, `APLICARÁ EN EL PAGO DE LA CORRIENTE QUINCENA O PERIODO DE PAGO.`, pos_x - 50, posY, font_size);
    posY += posYAddition;
    return posY;
}

export const addPDFPage = (doc: typeof PDFDocument) => {
    doc.addPage();
}

export const writeBoldPDFDoc = (
        doc: typeof PDFDocument, 
        value: string, 
        posX: number, 
        posY: number,
        fonSize: number = 15) => {
    doc.font('Helvetica-Bold')
        .fontSize(fonSize)
        .text(value, posX, posY);
}

export const writePDFDoc = (
        doc: typeof PDFDocument, 
        value: string, 
        posX: number, 
        posY: number,
        fonSize: number = 15) => {
    doc.font('Helvetica')
        .fontSize(fonSize)
        .text(value, posX, posY);
}

export const writeLinePDFDoc = (
        doc: typeof PDFDocument,
        posY: number) => {
    doc.save()
        .moveTo(10, posY)
        .lineTo(550, posY)
        .fill('#000000');
}

export const writeImagePDFDoc = (
        doc: typeof PDFDocument, 
        pathImage: string,
        posX: number, 
        posY: number,
        fitW: number,
        fitH: number = fitW) => {
    doc.image(pathImage, posX, posY, {fit: [fitW, fitH], align: 'center', valign: 'center'});
}

export const finishPDFDocument = (doc: typeof PDFDocument) => {
    doc.end();
}


