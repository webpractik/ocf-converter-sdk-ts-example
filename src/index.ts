import * as fs from 'fs';
import * as https from 'https';
import { OcfClient } from 'ocf-converter-sdk';
import * as process from 'process';
import * as yargs from 'yargs';

const run = async () => {
    const args = await yargs
        .option('apiKey', { type: 'string', demandOption: true, description: 'API ключ, который можно получить на странице https://onlineconvertfree.com/file-conversion-api/' })
        .option('filePath', { type: 'string', demandOption: true, description: 'Путь к файлу для конвертации' })
        .option('to', { type: 'string', demandOption: true, description: 'Расширение формата, в который нужно конвертировать файл' })
        .argv;

    const client = new OcfClient(args.apiKey);

    const filePath = args.filePath;
    const extensionToConvertTo = args.to;

    const task = await client.uploadFile(filePath, extensionToConvertTo);

    const result = await task.waitForConversion();

    if (result.isSuccess()) {
        const resultUrl = result.getResultingFileUrl() as string;

        await new Promise((resolve, reject) => {
            https.get(resultUrl, (response => {
                const path = `${__dirname}/../result.${extensionToConvertTo}`;
                const filePath = fs.createWriteStream(path);
                response.pipe(filePath);
                filePath.on('finish', async () => {
                    filePath.close();

                    await result.deleteFile();

                    resolve(0);
                }).on('error', error => reject(error));
            })).on('error', error => reject(error));
        });
    }
};

run()
    .then(() => {
        console.log('done');
        process.exit();
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
