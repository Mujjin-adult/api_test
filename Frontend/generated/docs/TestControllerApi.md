# TestControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getHelloMessage**](#gethellomessage) | **GET** /api/hello | |

# **getHelloMessage**
> { [key: string]: string; } getHelloMessage()


### Example

```typescript
import {
    TestControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TestControllerApi(configuration);

const { status, data } = await apiInstance.getHelloMessage();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: string; }**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

