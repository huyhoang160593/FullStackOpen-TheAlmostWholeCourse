```mermaid
sequenceDiagram
    participant B as browser
    participant S as server

    Note right of B: Fill the input and then click on `save` button
    B->>S: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate S
    S-->>B: HTTP status code 302 - FOUND
    deactivate S
    Note right of B: browser reload the page

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate S
    S-->>B: HTML document
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate S
    S-->>B: the css file
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate S
    S-->>B: the JavaScript file
    deactivate S

    Note right of B: The browser starts executing the JavaScript code that fetches the JSON from the server

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate S
    S-->>B: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate S

    Note right of B: The browser executes the callback function that renders the notes
```
