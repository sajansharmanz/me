# Decoding Browser Storage Options

The following is a high-level overview of when it is appropriate to use the different storage methods considering their offerings and security implications.

## **Sensitive Data**

If you are looking to store sensitive data which could include but not limited to.

- UserIDs
- SessionIDs
- JWTs
- Personal Information
- API Keys
- Information you wouldn’t want publicly available.

The storage option to select is _Cookies_ .

We must ensure that the cookie is set up in a secure fashion, the following are some important implementation steps.

- Ensure the cookie is cryptographically signed (varies based on framework used).
- Ensure the *httpOnly *flag is being set to true on the cookie when created.
- Ensure the *SameSite=strict *flag is being set to prevent CSRF attacks.

## **Non-Sensitive Data**

Data that you don’t mind being publicly available.

**_String Data_**

If you are looking to store data which is purely strings, the storage option to select is either *LocalStorage *or _SessionStorage._

Of course, you could serialize everything, but this is a hack, the browser provides a solution for more complex data, which is more performant for large applications.

_Possible library to use:_
[https://github.com/astoilkov/use-session-storage-state](https://github.com/astoilkov/use-session-storage-state)

[https://github.com/astoilkov/use-local-storage-state](https://github.com/astoilkov/use-local-storage-state)

**_Non-String Data_**

If you are looking to store data which is not purely strings, the storage option to select is *IndexDB. *This storage allows you to work with a database-esque object store in the browser.

It allows you to store typed information, define primary keys, handle indexing, and create transactions to prevent data integrity issues. A great resource to learn how to use this is located at [https://web.dev/indexeddb/](https://web.dev/indexeddb/).

_Possible library to use:_

[https://dexie.org/](https://dexie.org/)

# **Summary of solutions:**

|                            | **LocalStorage**                                                          | **SessionStorage**                                                           | **Cookie**                                            | **IndexDB**                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Capacity                   | 5MB                                                                       | 5MB                                                                          | 4KB                                                   | Firefox – 10% of Disk Size / Chromium – 60% of Disk Size\/ Safari – 1GB then will prompt user if needs more |
| Browsers                   | HTML5                                                                     | HTML5                                                                        | HTML4/HTML5                                           | HTML5                                                                                                       |
| Browser Support            | Very High                                                                 | Very High                                                                    | Very High                                             | Very High                                                                                                   |
| Storage Location           | Browser Only                                                              | Browser Only                                                                 | Browser & Server                                      | Browser                                                                                                     |
| Accessible From            | Any Window                                                                | Same Tab                                                                     | Any Window                                            | Any Window                                                                                                  |
| Sent With Requests         | No                                                                        | No                                                                           | Yes                                                   | No                                                                                                          |
| Expiration                 | Never                                                                     | On Tab Close                                                                 | Manually Set                                          | Never                                                                                                       |
| Data Type                  | String                                                                    | String                                                                       | String                                                | Any                                                                                                         |
| Editable/Blockable By User | Yes                                                                       | Yes                                                                          | Yes                                                   | Yes                                                                                                         |
| Encryption                 | None                                                                      | None                                                                         | With*httponly* Flag                                   | None                                                                                                        |
| Use Case                   | Non-sensitive and purely string data that should persist between sessions | Non-sensitive and purely string data that shouldn’t persist between sessions | Sensitive data that should not ever be publicly known | Non-sensitive and not purely string data                                                                    |

Resources:

[https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

[https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

[https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

[https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

[https://developer.mozilla.org/en-US/docs/Web/API/Storage_API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)

[https://owasp.org/www-community/HttpOnly](https://owasp.org/www-community/HttpOnly)
