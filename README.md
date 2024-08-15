---

# Online Chat API

This project implements an online chat API inspired by the classic UOL chat, built using [Bun](https://bun.sh/). The API supports participant management, message handling, and in-memory data storage.

## Features

- **Participant Management**
  - Add participants and list all participants.
  - Validate participant data on registration.
  
- **Message Handling**
  - Send messages to the chat (public or private).
  - Retrieve a list of recent messages with optional limits.
  
- **In-Memory Data Storage**
  - All participants and messages are stored in global in-memory variables.
  
- **Automatic Inactivity Removal**
  - Inactive participants are automatically removed after a set period.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rubensborges/bun-chat-api.git
    cd online-chat-api
    ```

2. Install dependencies:
    ```bash
    bun install
    ```

3. Run the server on port 4000:
    ```bash
    bun run src/index.ts
    ```

4. The API will be running at `http://localhost:4000`.

## API Endpoints

### **POST** `/participants`
- **Description**: Registers a new participant.
- **Request Body**:
    ```json
    {
        "name": "João"
    }
    ```
- **Validation**:
  - The `name` field cannot be empty.
  - The `name` must be unique.
- **Response**:
  - On success, returns `status 200`.
  - On error, returns `status 400`.

### **GET** `/participants`
- **Description**: Retrieves the list of all participants.
- **Response**:
  - Returns a JSON array of participants.

### **POST** `/messages`
- **Description**: Sends a new message to the chat.
- **Request Headers**:
  - `User`: The name of the participant sending the message.
- **Request Body**:
    ```json
    {
        "to": "Maria",
        "text": "oi sumida rs",
        "type": "private_message"
    }
    ```
- **Validation**:
  - `to` and `text` fields must be non-empty strings.
  - `type` must be either `message` or `private_message`.
  - `from` must be a valid participant.
- **Response**:
  - On success, returns `status 200`.
  - On error, returns `status 400`.

### **GET** `/messages`
- **Description**: Retrieves the chat messages.
- **Query Parameters**:
  - `limit`: Optional. Limits the number of messages returned.
- **Request Headers**:
  - `User`: The name of the participant making the request.
- **Response**:
  - Returns a JSON array of messages, filtered by the participant's visibility (public messages and private messages sent to or by the participant).

### **POST** `/status`
- **Description**: Updates the status of a participant.
- **Request Headers**:
  - `User`: The name of the participant to update.
- **Response**:
  - On success, returns `status 200`.
  - On error (if the participant does not exist), returns `status 400`.

## Automatic Removal of Inactive Users

- Every 15 seconds, the server checks for participants who have been inactive (i.e., their `lastStatus` is more than 10 seconds old).
- Inactive participants are removed from the list, and a status message is generated in the following format:
    ```json
    { "from": "João", "to": "Todos", "text": "sai da sala...", "type": "status", "time": "20:04:37" }
    ```

## Project Structure

- `src/`
  - `index.ts` - Main entry point of the application.
  - `routes/` - Contains the API route handlers.
  - `models/` - Defines the data structures for participants and messages.
  - `controllers/` - Contains the business logic for handling requests.
 
  - ## Inspired by the old but but 'Bate Papo UOL'
