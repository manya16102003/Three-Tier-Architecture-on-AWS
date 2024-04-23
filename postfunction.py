import json
import boto3

# Create a DynamoDB resource using the AWS SDK
dynamodb = boto3.resource('dynamodb')

# Use the DynamoDB resource to select our table
table_name = 'employeeProfile'
table = dynamodb.Table(table_name)

# Define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    try:
        # Extract values from the event object received from the Lambda service
        firstname = event['empFirstName']
        emp_id = event['empId']
        lastname = event['empLastName']
        age = event['empAge']

        # Write data to the DynamoDB table using the put_item method
        response = table.put_item(
            Item={
                'empId': emp_id,
                'empAge': age,
                'empFirstName': firstname,
                'empLastName': lastname
            }
        )

        # Return a properly formatted JSON response
        return {
            'statusCode': 200,
            'body': json.dumps({'message': f'Successfully added employee: {firstname} {lastname}', 'data': event})
        }

    except KeyError as e:
        # Handle the case when a required key is missing in the event
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Missing key: {str(e)}'})
        }
    except Exception as e:
        # Handle other exceptions
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Internal server error: {str(e)}'})
        }
