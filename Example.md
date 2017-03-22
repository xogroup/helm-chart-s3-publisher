# Examples

All examples shown leverages the core `BunnyBus` [API](http://github.com/xogroup/bunnybus/blob/master/API.md).  Check the documentation there for inquiries for how payloads and configuration should be provided.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Help pages](#help-pages)
- [Starting web server with environment variables](#starting-web-server-with-environment-variables)
- [Starting docker with environment variables](#starting-docker-with-environment-variables)
- [Starting web server with arguments](#starting-web-server-with-arguments)
- [Starting docker with arguments](#starting-docker-with-arguments)
- [Uploading a new chart to S3](#uploading-a-new-chart-to-s3)
- [Uploading a new chart to S3 under a `qa` prefix](#uploading-a-new-chart-to-s3-under-a-qa-prefix)
- [Refreshing the `index.yaml` manifest](#refreshing-the-indexyaml-manifest)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Help pages

There is a help page which can be pulled up via the `-h` flag.

```
helm-chart-publisher -h
```

Will bring up

```
  Usage: helm-chart-publisher [options]

  Options:

    -h, --help                                     output usage information
    -V, --version                                  output the version number
    -H, --host <host>                              host address to listen with
    -P, --port <port>                              port to listen with
    -r, --region <string>                          AWS region (defaults to us-east-1
    -a, --accessKey <token>                        AWS access key
    -s, --secretKey <token>                        AWS secret key
    -b, --bucket <string>, AWS S3 Bucket
    -f, --file <path>, Path to configuration file
```

## Starting web server with environment variables

```
ACCESSKEY=123xyz099 SECRETKEY=098abc211 BUCKET=chart-repo helm-chart-publisher
```

## Starting docker with environment variables

```
docker run -e ACCESSKEY=123xyz099 -e SECRETKEY=098abc211 -e BUCKET=chart-repo xogroup/helm-chart-s3-publisher
```

## Starting web server with arguments

```
helm-chart-publisher -a 123xyz099 -s 098abc211 -b chart-repo
```

## Starting docker with arguments

```
docker run xogroup/helm-chart-s3-publisher -a 123xyz099 -s 098abc211 -b chart-repo
```

## Uploading a new chart to S3

```
curl -i -X POST -F chart=@/home/bob/prometheus-0.1.0.tgz http://localhost:8080/charts
```

Will result in your S3 bucket having these new files

```
prometheus-0.1.0.tgz
index.yaml
```

## Uploading a new chart to S3 under a `qa` prefix

```
curl -i -X POST -F repo=qa -F chart=@/home/bob/prometheus-0.1.0.tgz http://localhost:8080/charts
```

Will result in your S3 bucket having these new files

```
/qa/prometheus-0.1.0.tgz
/qa/index.yaml
```

## Refreshing the `index.yaml` manifest

Let's say your S3 bucket containing the chart packages had its manifest delete.  And your S3 bucket is in the following state.

```
/qa/prometheus-0.1.0.tgz
/qa/prometheus-0.2.0.tgz
```

Hitting the rebuild endpoint will fix that.

```
curl -X POST -F subRepo=qa http://localhost:8080/index/rebuild
```

Will result with a new `index.yaml` in the `qa` prefix portion of the bucket.

```
/qa/index.yaml
/qa/prometheus-0.1.0.tgz
/qa/prometheus-0.2.0.tgz
```


