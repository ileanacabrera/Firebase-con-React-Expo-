const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const REGION = "us-east-1";
const NOMBRE_BUCKET = process.env.BUCKET_NAME || "imagenes-miapps";

exports.handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
    };

    // Manejo de preflight request
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers,
        };
    }

    try {
        const { nombreArchivo, tipoArchivo } = JSON.parse(event.body || '{}');

        if (!nombreArchivo || !tipoArchivo) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ mensaje: "Faltan parámetros requeridos" }),
            };
        }

        const s3 = new S3Client({ region: REGION });

        const comando = new PutObjectCommand({
            Bucket: NOMBRE_BUCKET,
            Key: `uploads/${Date.now()}-${nombreArchivo}`,
            ContentType: tipoArchivo,
        });

        const url = await getSignedUrl(s3, comando, { expiresIn: 3600 });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ url }),
        };
    } catch (error) {
        console.error("Error en lambda:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ mensaje: "Error interno del servidor" }),
        };
    }
};