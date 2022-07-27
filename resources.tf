provider "aws" {
  region     = "us-east-1"
  access_key = "12345"
  secret_key = "12345"

  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  s3_use_path_style = true
  endpoints {
    dynamodb = "${var.aws_host}:4566"
    lambda   = "${var.aws_host}:4566"
    s3       = "${var.aws_host}:4566"
    sts = "${var.aws_host}:4566"
    iam = "${var.aws_host}:4566"
    sqs = "${var.aws_host}:4566"
  }
}

variable "aws_host" {
  type        = string
  default     = "http://localhost"
  description = "The host name for localstack service (mock aws)"
}

variable "lambda_function_name" {
  default = "daniels-first-lambda"
}
variable "lambda_function_name_2" {
  default = "a-stream-lambda"
}

// LAMBDAS

resource "aws_lambda_function" "simple_example" {
  function_name = "${var.lambda_function_name}"
  filename = "src/lambda-example/dist/lambda.zip"
  source_code_hash       = filebase64sha256("src/lambda-example/dist/lambda.zip")
  handler       = "handler.hello"
  runtime       = "nodejs14.x"
  role          = aws_iam_role.iam_for_lambda.arn

  environment {
    variables = {
      "USER_TYPE" = "GUEST"
      "THEME"     = "DEFAULT"
    }
  }
}

resource "aws_lambda_function" "stream_lambda_example" {
  function_name = "${var.lambda_function_name_2}"
  filename = "src/stream-lambda/dist/lambda.zip"
  source_code_hash       = filebase64sha256("src/stream-lambda/dist/lambda.zip")
  handler       = "handler.streamer"
  runtime       = "nodejs14.x"
  role          = aws_iam_role.iam_for_lambda.arn

  environment {
    variables = {
      "USER_TYPE" = "GUEST"
      "THEME"     = "DEFAULT"
    }
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : "sts:AssumeRole",
          "Principal" : {
            "Service" : "lambda.amazonaws.com"
          },
          "Effect" : "Allow",
        }
      ]
    }
  )
}

resource "aws_iam_policy" "lamb_logging_policy" {
  name = "lamb_logging_policy"
  path = "/"
  description = "IAM POLICY FOR LOGGIN LAMBDA"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Effect" : "Allow",
        "Resource" : "arn:aws:logs:*:*:*"
      }
    ]
  })

}


resource "aws_iam_role_policy_attachment" "attachment_for_lambda" {
  role       = aws_iam_role.iam_for_lambda.id
  policy_arn = aws_iam_policy.lamb_logging_policy.arn

}


// Customer dynamodb table
resource "aws_dynamodb_table" "customers" {
  name           = "CUSTOMER_LIST"
  read_capacity  = "20"
  write_capacity = "20"
  hash_key       = "CUSTOMER_ID"
  range_key = "CREATED_AT"
  stream_view_type = "NEW_AND_OLD_IMAGES"
  stream_enabled = true

  attribute {
    name = "CUSTOMER_ID"
    type = "S"
  }

  attribute {
    name = "CREATED_AT"
    type = "N"
  }
}

// Trigger stream lambda with customer list' stream
resource "aws_lambda_event_source_mapping" "example" {
  event_source_arn  = aws_dynamodb_table.customers.stream_arn
  function_name     = aws_lambda_function.stream_lambda_example.arn
  starting_position = "LATEST"
}

// Example of table with a global secondary index
resource "aws_dynamodb_table" "cats" {
  name         = "cats"
  hash_key     = "CAT_ID"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "CAT_ID"
    type = "S"
  }
  attribute {
    name = "CAT_CREATED_AT"
    type = "S"
  }

  global_secondary_index {
    name            = "NEW_GSI"
    hash_key        = "CAT_ID"
    range_key       = "CAT_CREATED_AT"
    projection_type = "ALL"
  }
}

// Example of an SNS queue

// Example of an SQS queue
resource "aws_sqs_queue" "payment_queue" {
  name = "payments"
  delay_seconds = 30
  max_message_size = 2048
  message_retention_seconds = 60 * 60 * 2
  receive_wait_time_seconds = 10

  tags = {
    "application" = "alert-service"
  }
}

resource "aws_sqs_queue" "customer_queue" {
  name = "customers.fifo"
  max_message_size = 2048
  # this queue is first-in-first-out, order matters
  fifo_queue = true
  content_based_deduplication = true

  tags = {
    "application" = "alert-service"
  }
}


// S3 Resources
resource "aws_s3_bucket" "fruit_bucket" {
  bucket = "fruit-bucket"

  tags = {
    category = "fruit images"
  }
}