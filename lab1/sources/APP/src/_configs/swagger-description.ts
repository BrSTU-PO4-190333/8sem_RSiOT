export const swaggerDescription = `
## Cхема базы данных "МикроБлок"

<figure>
    <pre><code>
         + -------------------- +         + --------------- +
         | users                |         | posts           |
         | -------------------- |         + --------------- +
    +- 1 | id: number           | 1 -+    | id: number      | 1 -+
    |    | login: string        |    +- n | userId: number  |    |
    |    | email: string        |         | title: string   |    |
    |    | hashPassword: string |         | content: string |    |
    |    + -------------------- +         + --------------- +    |
    |                                                            |
    |    + --------------------- +                               |
    |    | postComments          |                               |
    |    + --------------------- +                               |
    |    | id: number            |                               |
    +- n | commentatorId: number |                               | 
         | postId: number        | n ----------------------------+
         | message: string       |
         + --------------------- +
    </code></pre>
</figure>

## Таблицы базы данных
- **users** - таблица для регистрации пользователей
- **posts** - таблица для хранения постов 
- **postComments** - таблица для хранения комментариев поста
`;
