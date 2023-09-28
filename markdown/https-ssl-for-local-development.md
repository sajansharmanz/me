# HTTPS/SSL For Local Development

Have you ever needed to run your project locally with HTTPS but all you ever get is browser warning's because the certificate isn't trusted? Well carry on reading because today we're discussing how to rid these errors forever.

## MKCert

[MKCert](https://github.com/FiloSottile/mkcert) is a simple zero-config tool to make locally trusted development certificates with any names you'd like, with no configuration.

_I'm going to walk through how to make these on macOS but if you are a Windows or Linux user visit the GitHub page for full details [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)._

Let's look at how to set it up on macOS.

Firstly, install MKCert on your machine.

```shell
brew install mkcert
brew install nss # if you use Firefox
```

Now create a new local CA (certificate authority).

```shell
mkcert -install
```

Now create your SSL certificate.

```shell
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1
```

After running the above command you will see your SSL certificate files generated.

```shell
The certificate is at "./example.com+5.pem" and the key at "./example.com+5-key.pem"
```

You can then use these on your server/application and have a working HTTPS setup!

For example, if you wanted to enable HTTPS for your ExpressJS server the code would look like.

_(I moved the SSL certificate files to a folder in the root of your project called ssl)._

```shell
https
    .createServer(
        {
            key: fs.readFileSync(
                path.join(__dirname, "../ssl", "cert-key.pem")
            ),
            cert: fs.readFileSync(
                path.join(__dirname, "../ssl", "cert.pem")
            ),
        },
        app
    )
    .listen(3000, () => {
        console.info("Server started on port 3000");
    });
```

## Trust certificates on mobile

A lot of the time you will use your devices over LAN to test your application. You can trust the SSL certificates on these devices very easily too!

**_Quick note_**

The `rootCA-key.pem` file that mkcert automatically generates gives complete power to intercept secure requests from your machine. Do not share it with others.

_For this process i'm assuming you have added the IP address of your machine to the SSL certificate when it was generated._

Run the following command to locate your rootCA file.

```shell
mkcert -CAROOT
```

Once located, copy the file to your device and add the CA to your device _(GitHub page linked earlier has instructions on how to trust for both iOS and Android)._
