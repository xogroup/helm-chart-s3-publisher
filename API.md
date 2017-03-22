# 1.0.0 API Reference

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Command Line Arguments](#command-line-arguments)
  - [Required Flags](#required-flags)
  - [Optional Flags](#optional-flags)
- [Configuration File](#configuration-file)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
  - [`POST /charts`](#post-charts)
    - [Form Parameters](#form-parameters)
  - [`PUT /charts`](#put-charts)
    - [Form Parameters](#form-parameters-1)
  - [`POST /index/rebuild`](#post-indexrebuild)
    - [Form Parameters](#form-parameters-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Command Line Arguments

### Required Flags

- `-a, --accessKey <token>` - AWS access key *[string]*'.
- `-s, --secretKey <token>` - AWS secret key *[string]*.
- `-b, --bucket <string>` - AWS S3 Bucket *[string]*.

### Optional Flags

- `-h, --help` - print help page.
- `-H, --host <host>` - host address to listen with (defaults to `0.0.0.0`). *[string]*
- `-P, --port <port>` - port to listen with (defaults to `8080`). *[integer]*
- `-r, --region <string>` - AWS region (defaults to `us-east-1`. *[string]*
- `-f, --file <path>` - Path to [configuration file](#configuration-file). *[string]*

## Configuration File

The configuration file is in JSON format.

```Javascript
{
    "accessKey" : "<AWS access key>",
    "secretKey" : "<AWS secret key>",
    "region" : "<AWS region>",
    "bucket" : "<AWS S3 bucket">",
    "port" : "8080",
    "host" : "127.0.0.1"
}
```

## Environment Variables

- `ACCESSKEY` - AWS access key *[string]*'.
- `SECRETKEY` - AWS secret key *[string]*.
- `REGION` - AWS region (defaults to `us-east-1`. *[string]*
- `BUCKET` - AWS S3 Bucket *[string]*.
- `HOST` - host address to listen with. *[string]*
- `PORT` - port to listen with. *[integer]*

## Endpoints

### `POST /charts`
Allows you to post new charts to the repository.  If the name of the uploaded chart matches one in S3, the call will fail.  This call will also update the `index.yaml` manifest.

#### Form Parameters
- `subRepo` - name of the prefix / subfolder to push the chart into *[string]* **Optional**
- `chart` - content of the file *[file]* **Required**

```
curl -i -X POST -F repo=qa -F chart=@/home/bob/prometheus-0.1.0.tgz http://localhost:8080/charts
```

### `PUT /charts`
Allows you to update an existing chart to the repository.  This call will also update the `index.yaml` manifest.

#### Form Parameters
- `subRepo` - name of the prefix / subfolder to push the chart into *[string]* **Optional**
- `chart` - content of the file *[file]* **Required**

```
curl -i -X PUT -F repo=qa -F chart=@/home/bob/prometheus-0.1.0.tgz http://localhost:8080/charts
```

### `POST /index/rebuild`
Allows for a full rebuild of the `index.yaml` file.  If the manifest is out of sync with the actual content of the bucket, this will fix it.

#### Form Parameters
- `subRepo` - name of the prefix / subfolder to push the chart into *[string]* **Optional**
- `chart` - content of the file *[file]* **Required**

```
curl -X POST -F subRepo=qa http://localhost:8080/index/rebuild
```


