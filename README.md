# Пример использования [SDK для работы с API конвертации файлов onlineconvertfree.com](https://github.com/webpractik/ocf-converter-sdk-ts)

## Требования

Node.js 16.15.1.

## Установка зависимостей

```shell
npm ci
```

## Сборка

```shell
tsc
```

## Использование

```shell
node dist/index.js --apiKey=apiКлюч --filePath=./example.png --to=pdf
```

`apiKey` - API ключ, который можно получить на странице https://onlineconvertfree.com/file-conversion-api/ после регистрации.  
`filePath` - путь к исходному файлу.  
`to` - расширение формата, в который нужно конвертировать файл.  

Результат конвертации должен появиться в корне проекта под именем result с соответствующим расширением, например, `result.pdf`.
