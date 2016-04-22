# ADS-RESTful - A Node.js® server providing a REST interface to your Beckhoff PLC
 TwinCAT (©) PLC (Note: document under construction)

## Overview
Give your applications access to a Beckhoff PLC via REST API.
ADS-RESTful is a server application running on Node.js®.
The REST interface is targeted for applications like smart home apps
(not non-real-time apps). You simply have to connect the ADS-RESTful server
to a PLC (e.g. runnning on a Raspberry PI - not yet tested on the PLC itself).
Applications can access the PLC variables via the REST-API provided by the
ADS-RESTful server. (TwinCAT and ADS are products by © Beckhoff Automation
GmbH & Co. KG, Germany. I am not affiliated).

To write a client application you can create easily a server stub using the
[swagger-codegen](https://github.com/swagger-api/swagger-codegen) project.   
[README](https://github.com/swagger-api/swagger-codegen/blob/master/README.md)

### Running the server (under construction)
To run the server, follow these simple steps:

configure ./adscommoptions.cfg like below
```
#==============================================================================
# Configuration file ADS-RESTful Server
#==============================================================================
# mandatory parameters are host, amsNetIdTarget, amsNetIdSource
# more optional parameters can be specified for details refer to the
# documentation in the node modul 'ads'.

#==============================================================================
# Target PLC
#==============================================================================
# host: IP address of the Beckhoff PLC (target)
# e.g. 192.168.1.10
host = x.x.x.x
# amsNetIdTarget: amsNetID of the target PLC
# e.g. 5.32.40.12.1.1
amsNetIdTarget = x.x.x.x.x.x

#==============================================================================
# Source: Running the ads-restful-svr
# Note: the amsNetID needs to be entered as a route on the PLC !
#==============================================================================
# amsNetIdSource: amsNetId is a route defined on the PLC to find the IP address
# where the ads-restful-svr is running
# e.g. 5.5.1.14.1.1
amsNetIdSource = x.x.x.x.x.x
```

Then start the server

```
node ads-restful-server.js
```

To view the Swagger UI interface:

```
open http://localhost:8080/docs
```

Note: When running the ADS-RESTful server on a Windows PC you have to stop
TwinCat2. Running both programs in parallel seems to cause negative side effects.

### Copyright and License
License (MIT)
Copyright (c) 2016 tlumpp

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
