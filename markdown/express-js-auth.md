# ExpressJS Auth

There are countles tutorials online about how to go about auth in ExpressJS, so i'm not going to make this another one to add to the list. I'll cover some considerations to make when setting up your own auth.

## Secure HttpOnly Cookie

I've lost count on how many times I have read debates on how to store your access token/refresh token. Although it adds a bit more complexity to the setup, storing these in a Secure HttpOnly Cookie is the best practice.

When people recommend storing tokens in the browser storage, they are underestimating the ability of XSS attacks to access the data (even with all the modern browsers making it much harder to do so!). There are countless security articles showing how easy it is to exploit at times.

Let's see how Secure HttpOnly Cookies fix the issue.

### Secure Flag

When a secure flag is used, then the cookie will only be sent over HTTPS. In this case, the attacker eavesdropping on the communication channel from the browser to server will not be able to read the cookie. If your website allows HTTP, the cookie will not be sent so it can't be compromised here either.

### HttpOnly Flag

When this flag is used, JavaScript will not be able to read the cookie, therefore, we are not vulnerable to XSS attacks.

Many people then make the argument that a combination of HTTP TRACE/XSS (known as a XST attack) can be used to compromise a HttpOnly cookie. Modern browsers by default block HTTP TRACE requests, so being able to perform this attack is considerably difficult and a lot of security people think the attack vector is not even worth a mention nowadays.

## Don't store tokens in plain text in the database

With the increase data breaches we've seen over time, its more important than ever to not store access tokens/refresh tokens in plain text.

A lot of people have setup their auth systems to store their access/refresh tokens in the database so they can be invalidated, however, a lot of people leave these tokens in plain text. This means if your database is ever compromised without you know,ing the attackers can use accounts without their knowledge.

Hashing the tokens before they are inserted into the database is vital as it will scramble the token so that it can't be used, but, when verifying the token, your hashing algorithm will able to know if what was provided matches what is in the database.
