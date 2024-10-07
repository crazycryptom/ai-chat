
## Installation

Install node modules

```bash
  npm install  
```

Edit .env with your database url, name, user, password, host url, openai key

```bash
  npx prisma migrate deploy
  npx prisma db seed
  npx prisma generate
```

Build the project

```bash
  npm run build  
```


## Customization

- To modify the initial settings, apply that changes in
    ```prisma/seed.ts```, ```app/api/settings.ts```

- To update the primary and secondary color, apply that changes in
    ```tailwind.config.ts```
    ```
    theme: {
        extend: {
            backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
                "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        colors: {
            primary: '#343541', //primary color
            secondary: '#454654', //secondary color
            success: '#00A6ED',
            info: '#007BFF',
            warning: '#FFC000',
            danger: '#FF0000',
            }
        }, 
    }
    ```
- To apply change in db structure, you can
    - change the schema in ```schmea.prisma```
    - ```npx prisma migrate dev --name (ex: new_update_schema)```
    - apply change in ```seed.ts```
- To change the icon of web page modify ```app/favicon.ico```
- To modify the assets, check ```public/assets``` folder.
    To change the chatgpt and user icon paths, modify them in ```app/ui/ai-message```, ```app/ui/user-message ```

***
- ```app/page.tsx``` main page
- ```app/admin``` admin page
- ```app/api``` backend
- ```app/interfaces``` type definitions
- ```app/styles``` styles
- ```app/ui``` components
- ```prisma``` prisma db
***

## GPT Customization

- models: 
    ```gpt-4o```, ```gpt-4o-2024-05-13```, ```gpt-4-turbo```, ```gpt-4-turbo-2024-04-09```, ```gpt-4-0125-preview```, ```gpt-4-turbo-preview```, ```gpt-4-1106-preview```, ```gpt-4-vision-preview```, ```gpt-4```, ```gpt-4-0314```, ```gpt-4-0613```, ```gpt-4-32k```, ```gpt-4-32k-0314```, ```gpt-4-32k-0613```, ```gpt-3.5-turbo```, ```gpt-3.5-turbo-16k```, ```gpt-3.5-turbo-0301```, ```gpt-3.5-turbo-0613```, ```gpt-3.5-turbo-1106```, ```gpt-3.5-turbo-0125```, ```gpt-3.5-turbo-16k-0613```

- tokens:
    Once you increase tokens, you get much response but don't overflow above 4096, it won't work.

- temperature:
    Min value: 0, Max value: 2. The higher temperature, the randomess of responses increase