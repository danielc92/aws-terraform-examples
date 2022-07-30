# Daniel's Localstack Sandbox

### Prerequisites

- installation of localstack
- installation of docker
- installation of nvm (lower node versions may be compatible)
  - `v16.0.0 (Currently using 64-bit executable)`

### First time setup

- Switch to the correct node version `nvm use`
- Start localstack via docker `docker-compose up`
- Install dependencies `yarn`
- Create resources via terraform `terraform plan && terraform apply`

### How to build

- `yarn tsc`

### How to run insert or update record script

- `node dist\\insert-records.js`
- `node dist\\update-record.js`

### Daniels notes

#### Listing tables in Dynamodb

```
awslocal dynamodb list-tables --endpoint=http://localhost:4566 --region=ap-southeast-2
```

#### Getting log streams and groups

Get log groups

```
awslocal logs describe-log-groups --region ap-southeast-2
```

Get log streams for a log group

```
awslocal logs describe-log-streams --region ap-southeast-2 --log-group-name /aws/lambda/daniels-first-lambda
```

#### Invoking lambdas

docs: https://docs.aws.amazon.com/cli/latest/reference/lambda/invoke.html

```
awslocal lambda invoke --function-name=daniels-first-lambda --region=ap-southeast-2 lambda-logs\output.json
```

#### Listing available lambdas

```
awslocal lambda list-functions --region ap-southeast-2
```

#### How to debug a lambda through cli

First invoke it specifiying 'Tail' log type

```

awslocal lambda invoke --function-name daniels-first-lambda out --log-type Tail --region ap-southeast-2

```

The resulting output will be something like this

```

{
"StatusCode": 200,
"LogResult": "G1szMm1TVEFSVCBSZXF1ZXN0SWQ6IGY4NDk2MzNhLTlhNzktMWMyZi0xNWY3LWNlOGNiOWYyMDdlMCBWZXJzaW9uOiAkTEFURVNUG1swbQoyMDIyLTA0LTEwVDAxOjA2OjE2LjgzMVoJZjg0OTYzM2EtOWE3OS0xYzJmLTE1ZjctY2U4Y2I5ZjIwN2UwCUlORk8JRGVidWdnaW5nIHRoZSBldmVudCBieSBkYW5pZWwKMjAyMi0wNC0xMFQwMTowNjoxNi44MzJaCWY4NDk2MzNhLTlhNzktMWMyZi0xNWY3LWNlOGNiOWYyMDdlMAlXQVJOCVdhcm5pbmcgRGVidWdnaW5nIHRoZSBldmVudCBieSBkYW5pZWwKG1szMm1FTkQgUmVxdWVzdElkOiBmODQ5NjMzYS05YTc5LTFjMmYtMTVmNy1jZThjYjlmMjA3ZTAbWzBtChtbMzJtUkVQT1JUIFJlcXVlc3RJZDogZjg0OTYzM2EtOWE3OS0xYzJmLTE1ZjctY2U4Y2I5ZjIwN2UwCUluaXQgRHVyYXRpb246IDEwMy4wOSBtcwlEdXJhdGlvbjogNi40NyBtcwlCaWxsZWQgRHVyYXRpb246IDEwMCBtcwlNZW1vcnkgU2l6ZTogMTUzNiBNQglNYXggTWVtb3J5IFVzZWQ6IDQ3IE1CCRtbMG0=",
"ExecutedVersion": "$LATEST"
}

```

pass the base64 string to the base64 cli

```

base64 -d -s G1szMm1TVEFSVCBSZXF1ZXN0SWQ6IGY4NDk2MzNhLTlhNzktMWMyZi0xNWY3LWNlOGNiOWYyMDdlMCBWZXJzaW9uOiAkTEFURVNUG1swbQoyMDIyLTA0LTEwVDAxOjA2OjE2LjgzMVoJZjg0OTYzM2EtOWE3OS0xYzJmLTE1ZjctY2U4Y2I5ZjIwN2UwCUlORk8JRGVidWdnaW5nIHRoZSBldmVudCBieSBkYW5pZWwKMjAyMi0wNC0xMFQwMTowNjoxNi44MzJaCWY4NDk2MzNhLTlhNzktMWMyZi0xNWY3LWNlOGNiOWYyMDdlMAlXQVJOCVdhcm5pbmcgRGVidWdnaW5nIHRoZSBldmVudCBieSBkYW5pZWwKG1szMm1FTkQgUmVxdWVzdElkOiBmODQ5NjMzYS05YTc5LTFjMmYtMTVmNy1jZThjYjlmMjA3ZTAbWzBtChtbMzJtUkVQT1JUIFJlcXVlc3RJZDogZjg0OTYzM2EtOWE3OS0xYzJmLTE1ZjctY2U4Y2I5ZjIwN2UwCUluaXQgRHVyYXRpb246IDEwMy4wOSBtcwlEdXJhdGlvbjogNi40NyBtcwlCaWxsZWQgRHVyYXRpb246IDEwMCBtcwlNZW1vcnkgU2l6ZTogMTUzNiBNQglNYXggTWVtb3J5IFVzZWQ6IDQ3IE1CCRtbMG0=

```
