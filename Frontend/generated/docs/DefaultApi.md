# DefaultApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**autocomplete**](#autocomplete) | **GET** /api/search/autocomplete | 검색어 자동완성|
|[**changePassword**](#changepassword) | **PUT** /api/users/password | 비밀번호 변경|
|[**createBookmark**](#createbookmark) | **POST** /api/bookmarks | 북마크 생성|
|[**deleteAccount**](#deleteaccount) | **DELETE** /api/users/me | 회원 탈퇴|
|[**deleteAllRecentSearches**](#deleteallrecentsearches) | **DELETE** /api/search/recent | 모든 최근 검색어 삭제|
|[**deleteBookmark**](#deletebookmark) | **DELETE** /api/bookmarks/{id} | 북마크 삭제|
|[**deleteRecentSearch**](#deleterecentsearch) | **DELETE** /api/search/recent/{id} | 최근 검색어 삭제|
|[**findId**](#findid) | **POST** /api/auth/find-id | 아이디 찾기|
|[**forgotPassword**](#forgotpassword) | **POST** /api/auth/forgot-password | 비밀번호 재설정 요청|
|[**getActiveCategories**](#getactivecategories) | **GET** /api/categories/active | 활성 카테고리 목록 조회|
|[**getActivePreferences**](#getactivepreferences) | **GET** /api/preferences/categories/active | 활성 구독 조회|
|[**getAllCategories**](#getallcategories) | **GET** /api/categories | 전체 카테고리 목록 조회|
|[**getBookmark**](#getbookmark) | **GET** /api/bookmarks/{id} | 북마크 상세 조회|
|[**getBookmarkCount**](#getbookmarkcount) | **GET** /api/bookmarks/count | 북마크 개수 조회|
|[**getCategoryByCode**](#getcategorybycode) | **GET** /api/categories/{code} | 특정 카테고리 조회|
|[**getImportantNotices**](#getimportantnotices) | **GET** /api/notices/important | 중요 공지사항 목록 조회|
|[**getMyBookmarks**](#getmybookmarks) | **GET** /api/bookmarks | 북마크 목록 조회|
|[**getMyInfo**](#getmyinfo) | **GET** /api/users/me | 내 정보 조회|
|[**getMyPreferences**](#getmypreferences) | **GET** /api/preferences/categories | 구독 카테고리 조회|
|[**getNoticeDetail**](#getnoticedetail) | **GET** /api/notices/{noticeId} | 공지사항 상세 조회|
|[**getNotices**](#getnotices) | **GET** /api/notices | 공지사항 목록 조회|
|[**getPopularKeywords**](#getpopularkeywords) | **GET** /api/search/popular | 인기 검색어 조회|
|[**getRecentSearches**](#getrecentsearches) | **GET** /api/search/recent | 최근 검색어 조회|
|[**getRelatedNotices**](#getrelatednotices) | **GET** /api/notices/{noticeId}/related | 관련 공지사항 조회|
|[**handleNewNotice**](#handlenewnotice) | **POST** /api/webhook/new-notice | 새 공지사항 등록 웹훅|
|[**health**](#health) | **GET** /api/webhook/health | 웹훅 헬스체크|
|[**isBookmarked**](#isbookmarked) | **GET** /api/bookmarks/check/{noticeId} | 북마크 여부 확인|
|[**isSubscribed**](#issubscribed) | **GET** /api/preferences/categories/{categoryId}/subscribed | 구독 여부 확인|
|[**login**](#login) | **POST** /api/auth/login | 로그인 (Firebase Authentication)|
|[**loginWithEmail**](#loginwithemail) | **POST** /api/auth/login/email | 이메일/비밀번호 로그인 (간편)|
|[**logout**](#logout) | **POST** /api/auth/logout | 로그아웃|
|[**resendVerificationEmail**](#resendverificationemail) | **POST** /api/auth/resend-verification-email | 이메일 인증 메일 재발송 (Firebase)|
|[**saveRecentSearch**](#saverecentsearch) | **POST** /api/search/recent | 최근 검색어 저장|
|[**search**](#search) | **GET** /api/search | 공지사항 전문 검색|
|[**sendVerificationEmail**](#sendverificationemail) | **POST** /api/auth/send-verification-email | 이메일 인증 메일 발송 (Firebase)|
|[**signUp**](#signup) | **POST** /api/auth/signup | 회원가입 (Firebase 통합)|
|[**subscribeCategory**](#subscribecategory) | **POST** /api/preferences/categories | 카테고리 구독|
|[**unsubscribeCategory**](#unsubscribecategory) | **DELETE** /api/preferences/categories/{categoryId} | 구독 취소|
|[**updateBookmarkMemo**](#updatebookmarkmemo) | **PUT** /api/bookmarks/{id}/memo | 북마크 메모 수정|
|[**updateFcmToken**](#updatefcmtoken) | **PUT** /api/users/fcm-token | FCM 토큰 업데이트|
|[**updateNotification**](#updatenotification) | **PUT** /api/preferences/categories/{categoryId}/notification | 알림 설정 변경|
|[**updateProfile**](#updateprofile) | **PUT** /api/users/me | 프로필 수정|
|[**updateSettings**](#updatesettings) | **PUT** /api/users/settings | 사용자 설정 수정|

# **autocomplete**
> ApiResponseListAutocompleteSuggestion autocomplete()

입력 중인 검색어에 대한 자동완성 제안을 제공합니다.  - 최소 2글자 이상 입력 필요 - 접두사 매칭 (prefix matching) - 매칭된 공지사항 수와 함께 반환 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let prefix: string; //검색어 접두사 (최소 2글자) (default to undefined)
let limit: number; //결과 개수 제한 (optional) (default to 10)

const { status, data } = await apiInstance.autocomplete(
    prefix,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **prefix** | [**string**] | 검색어 접두사 (최소 2글자) | defaults to undefined|
| **limit** | [**number**] | 결과 개수 제한 | (optional) defaults to 10|


### Return type

**ApiResponseListAutocompleteSuggestion**

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

# **changePassword**
> ApiResponseVoid changePassword(changePasswordRequest)

현재 비밀번호 확인 후 새로운 비밀번호로 변경합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    ChangePasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let changePasswordRequest: ChangePasswordRequest; //

const { status, data } = await apiInstance.changePassword(
    changePasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changePasswordRequest** | **ChangePasswordRequest**|  | |


### Return type

**ApiResponseVoid**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createBookmark**
> ApiResponseResponse createBookmark(createRequest)

공지사항을 북마크에 저장합니다. 선택적으로 메모를 추가할 수 있습니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createRequest: CreateRequest; //

const { status, data } = await apiInstance.createBookmark(
    createRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRequest** | **CreateRequest**|  | |


### Return type

**ApiResponseResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteAccount**
> ApiResponseVoid deleteAccount(deleteAccountRequest)

회원 탈퇴를 처리합니다. 모든 사용자 데이터가 삭제됩니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    DeleteAccountRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let deleteAccountRequest: DeleteAccountRequest; //

const { status, data } = await apiInstance.deleteAccount(
    deleteAccountRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deleteAccountRequest** | **DeleteAccountRequest**|  | |


### Return type

**ApiResponseVoid**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteAllRecentSearches**
> ApiResponseString deleteAllRecentSearches()

사용자의 모든 최근 검색어를 삭제합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.deleteAllRecentSearches();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseString**

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

# **deleteBookmark**
> ApiResponseVoid deleteBookmark()

저장한 북마크를 삭제합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteBookmark(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseVoid**

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

# **deleteRecentSearch**
> ApiResponseString deleteRecentSearch()

특정 최근 검색어를 삭제합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteRecentSearch(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseString**

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

# **findId**
> ApiResponseFindIdResponse findId(findIdRequest)

이름과 학번으로 아이디(이메일)를 찾습니다. 마스킹된 이메일과 함께 전체 이메일이 발송됩니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    FindIdRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let findIdRequest: FindIdRequest; //

const { status, data } = await apiInstance.findId(
    findIdRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **findIdRequest** | **FindIdRequest**|  | |


### Return type

**ApiResponseFindIdResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **forgotPassword**
> ApiResponseString forgotPassword(forgotPasswordRequest)

비밀번호를 잊어버린 사용자에게 재설정 이메일을 발송합니다.  **Firebase 기반:** - Firebase Admin SDK로 비밀번호 재설정 링크 생성 - 이메일로 재설정 링크 발송 - 사용자는 링크를 클릭하여 새 비밀번호 설정  **사용 방법:** 1. 이메일 입력하여 요청 2. 이메일로 재설정 링크 수신 3. 링크 클릭하여 새 비밀번호 입력 4. Firebase에서 자동으로 비밀번호 업데이트  **제한:** - 동일 이메일로 1시간에 최대 3회까지 요청 가능 

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    ForgotPasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let forgotPasswordRequest: ForgotPasswordRequest; //

const { status, data } = await apiInstance.forgotPassword(
    forgotPasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **forgotPasswordRequest** | **ForgotPasswordRequest**|  | |


### Return type

**ApiResponseString**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActiveCategories**
> ApiResponseListResponse getActiveCategories()

활성 상태인 카테고리만 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getActiveCategories();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListResponse**

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

# **getActivePreferences**
> ApiResponseListResponse getActivePreferences()

알림이 활성화된 구독 카테고리만 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getActivePreferences();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListResponse**

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

# **getAllCategories**
> ApiResponseListResponse getAllCategories()

모든 카테고리의 목록을 조회합니다. 각 카테고리의 공지사항 개수도 함께 반환됩니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getAllCategories();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListResponse**

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

# **getBookmark**
> ApiResponseResponse getBookmark()

특정 북마크의 상세 정보를 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getBookmark(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseResponse**

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

# **getBookmarkCount**
> ApiResponseLong getBookmarkCount()

내가 저장한 북마크의 총 개수를 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getBookmarkCount();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseLong**

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

# **getCategoryByCode**
> ApiResponseResponse getCategoryByCode()

카테고리 코드로 특정 카테고리 정보를 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let code: string; // (default to undefined)

const { status, data } = await apiInstance.getCategoryByCode(
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **code** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseResponse**

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

# **getImportantNotices**
> ApiResponseListResponse getImportantNotices()

중요 표시된 공지사항 목록을 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getImportantNotices();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListResponse**

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

# **getMyBookmarks**
> ApiResponsePageResponse getMyBookmarks()

내가 저장한 북마크 목록을 페이징하여 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.getMyBookmarks(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**ApiResponsePageResponse**

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

# **getMyInfo**
> ApiResponseResponse getMyInfo()

현재 로그인한 사용자의 정보를 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getMyInfo();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseResponse**

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

# **getMyPreferences**
> ApiResponseListResponse getMyPreferences()

내가 구독한 모든 카테고리 목록을 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getMyPreferences();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListResponse**

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

# **getNoticeDetail**
> ApiResponseDetailResponse getNoticeDetail()

특정 공지사항의 상세 정보를 조회합니다. 조회 시 조회수가 1 증가합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let noticeId: number; //공지사항 ID (default to undefined)

const { status, data } = await apiInstance.getNoticeDetail(
    noticeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **noticeId** | [**number**] | 공지사항 ID | defaults to undefined|


### Return type

**ApiResponseDetailResponse**

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

# **getNotices**
> ApiResponsePageResponse getNotices()

공지사항 목록을 페이징하여 조회합니다. 카테고리, 중요 공지 필터링과 정렬 옵션을 제공합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let categoryId: number; //카테고리 ID (선택사항) (optional) (default to undefined)
let sortBy: string; //정렬 방식 (latest: 최신순, oldest: 오래된순, popular: 인기순) (optional) (default to 'latest')
let important: boolean; //중요 공지만 조회 여부 (optional) (default to undefined)
let page: number; //페이지 번호 (0부터 시작) (optional) (default to 0)
let size: number; //페이지 크기 (optional) (default to 20)

const { status, data } = await apiInstance.getNotices(
    categoryId,
    sortBy,
    important,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **categoryId** | [**number**] | 카테고리 ID (선택사항) | (optional) defaults to undefined|
| **sortBy** | [**string**] | 정렬 방식 (latest: 최신순, oldest: 오래된순, popular: 인기순) | (optional) defaults to 'latest'|
| **important** | [**boolean**] | 중요 공지만 조회 여부 | (optional) defaults to undefined|
| **page** | [**number**] | 페이지 번호 (0부터 시작) | (optional) defaults to 0|
| **size** | [**number**] | 페이지 크기 | (optional) defaults to 20|


### Return type

**ApiResponsePageResponse**

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

# **getPopularKeywords**
> ApiResponseListPopularKeyword getPopularKeywords()

최근 24시간 기준 인기 검색어 TOP N을 조회합니다.  **Note:** 현재는 구현되지 않았습니다. search_log 테이블 추가 후 활성화됩니다. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let limit: number; //조회할 인기 검색어 개수 (optional) (default to 10)

const { status, data } = await apiInstance.getPopularKeywords(
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] | 조회할 인기 검색어 개수 | (optional) defaults to 10|


### Return type

**ApiResponseListPopularKeyword**

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

# **getRecentSearches**
> ApiResponseListResponse getRecentSearches()

사용자의 최근 검색어 목록을 조회합니다. 최대 5개, 최신순으로 반환됩니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getRecentSearches();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListResponse**

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

# **getRelatedNotices**
> ApiResponseListResponse getRelatedNotices()

특정 공지사항과 같은 카테고리의 다른 공지사항을 조회합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let noticeId: number; //기준 공지사항 ID (default to undefined)
let limit: number; //조회할 관련 공지사항 개수 (optional) (default to 5)

const { status, data } = await apiInstance.getRelatedNotices(
    noticeId,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **noticeId** | [**number**] | 기준 공지사항 ID | defaults to undefined|
| **limit** | [**number**] | 조회할 관련 공지사항 개수 | (optional) defaults to 5|


### Return type

**ApiResponseListResponse**

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

# **handleNewNotice**
> ApiResponseWebhookResponse handleNewNotice(newNoticeWebhookRequest)

크롤러 서버에서 새 공지사항 등록 시 호출됩니다.  **동작 과정:** 1. 크롤러가 새 공지사항 발견 및 DB 저장 2. 이 웹훅 호출 (POST /api/webhook/new-notice) 3. 키워드 매칭 검사 4. 매칭된 사용자들에게 FCM 푸시 알림 발송  **보안:** - API Key 인증 필요 (X-API-Key 헤더) - 크롤러 서버만 호출 가능  **제한:** - Rate limit: 1000 requests/hour 

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    NewNoticeWebhookRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let newNoticeWebhookRequest: NewNoticeWebhookRequest; //
let xAPIKey: string; //크롤러 API Key (헤더) (optional) (default to undefined)

const { status, data } = await apiInstance.handleNewNotice(
    newNoticeWebhookRequest,
    xAPIKey
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newNoticeWebhookRequest** | **NewNoticeWebhookRequest**|  | |
| **xAPIKey** | [**string**] | 크롤러 API Key (헤더) | (optional) defaults to undefined|


### Return type

**ApiResponseWebhookResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **health**
> ApiResponseString health()

웹훅 서비스 상태 확인

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.health();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseString**

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

# **isBookmarked**
> ApiResponseBoolean isBookmarked()

특정 공지사항이 북마크되어 있는지 확인합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let noticeId: number; // (default to undefined)

const { status, data } = await apiInstance.isBookmarked(
    noticeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **noticeId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseBoolean**

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

# **isSubscribed**
> ApiResponseBoolean isSubscribed()

특정 카테고리를 구독하고 있는지 확인합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let categoryId: number; // (default to undefined)

const { status, data } = await apiInstance.isSubscribed(
    categoryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **categoryId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseBoolean**

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

# **login**
> ApiResponseLoginResponse login(loginRequest)

Firebase ID Token을 사용하여 로그인합니다.  **사용 방법:** 1. 클라이언트에서 Firebase SDK로 로그인    - 이메일/비밀번호: `signInWithEmailAndPassword(email, password)`    - Google: `signInWithPopup(googleProvider)`    - 기타 소셜 로그인 2. Firebase ID Token 발급: `user.getIdToken()` 3. 이 API에 ID Token 전송 4. 서버에서 토큰 검증 및 사용자 정보 동기화  **자동 회원가입:** Firebase로 로그인한 사용자가 서버 DB에 없는 경우, 자동으로 사용자가 생성됩니다.  **토큰 갱신:** Firebase SDK가 자동으로 처리합니다. `user.getIdToken(true)`를 호출하세요. 

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    LoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let loginRequest: LoginRequest; //

const { status, data } = await apiInstance.login(
    loginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | **LoginRequest**|  | |


### Return type

**ApiResponseLoginResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **loginWithEmail**
> ApiResponseLoginResponse loginWithEmail(emailLoginRequest)

이메일과 비밀번호로 간편하게 로그인합니다.  **사용법:** ```bash POST /api/auth/login/email {   \"email\": \"test@inu.ac.kr\",   \"password\": \"password123\",   \"fcmToken\": \"dW4f2...\" (선택사항) } ```  **응답:** ```json {   \"success\": true,   \"data\": {     \"idToken\": \"eyJhbGc...\",  // Firebase 커스텀 토큰     \"tokenType\": \"Bearer\",     \"expiresIn\": 3600,     \"user\": {       \"id\": 1,       \"email\": \"test@inu.ac.kr\",       \"name\": \"홍길동\"     }   } } ```  **주의:** - ✅ 회원가입 직후 바로 사용 가능 - ✅ Firebase SDK 없이도 로그인 가능 - ⚠️ idToken(커스텀 토큰)은 Firebase 로그인 시에만 사용 - 💡 API 인증에는 이 토큰을 그대로 사용하세요  **클라이언트 사용 예시:** ```javascript const response = await fetch(\'/api/auth/login/email\', {   method: \'POST\',   headers: { \'Content-Type\': \'application/json\' },   body: JSON.stringify({     email: \'test@inu.ac.kr\',     password: \'password123\'   }) });  const { idToken, user } = await response.json();  // API 요청 시 토큰 사용 fetch(\'/api/notices\', {   headers: { \'Authorization\': `Bearer ${idToken}` } }); ``` 

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    EmailLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let emailLoginRequest: EmailLoginRequest; //

const { status, data } = await apiInstance.loginWithEmail(
    emailLoginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **emailLoginRequest** | **EmailLoginRequest**|  | |


### Return type

**ApiResponseLoginResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **logout**
> ApiResponseVoid logout()

로그아웃 처리를 합니다. Firebase SDK에서 auth().signOut()을 호출하세요.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.logout();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseVoid**

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

# **resendVerificationEmail**
> ApiResponseString resendVerificationEmail()

Firebase 이메일 인증 메일을 재발송합니다.  **⚠️ 권장 방법 (클라이언트):** ```javascript const user = auth().currentUser; await user.sendEmailVerification(); ```  이미 발송된 인증 메일을 받지 못한 경우 재발송합니다. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.resendVerificationEmail(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseString**

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

# **saveRecentSearch**
> ApiResponseResponse saveRecentSearch(saveRequest)

검색한 키워드를 최근 검색어에 저장합니다. 최대 5개까지 저장되며, 중복 키워드는 검색 시각이 갱신됩니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    SaveRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let saveRequest: SaveRequest; //

const { status, data } = await apiInstance.saveRecentSearch(
    saveRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **saveRequest** | **SaveRequest**|  | |


### Return type

**ApiResponseResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **search**
> ApiResponseSearchResponse search()

PostgreSQL Full-Text Search를 사용한 고속 검색 기능입니다.  **검색 기능:** - 제목 및 내용에서 키워드 검색 - 여러 단어 입력 시 OR 검색 (예: \"장학금 학사\" → 장학금 OR 학사) - 검색어 하이라이트 (<mark> 태그) - 관련도 점수 기반 정렬 (ts_rank)  **정렬 옵션:** - relevance: 관련도순 (기본값) - 검색어와 가장 관련있는 순서 - latest: 최신순 - 게시일 기준 최신 - oldest: 오래된순 - 게시일 기준 오래된  **성능:** - GIN 인덱스 사용으로 LIKE 검색 대비 10-100배 빠름 - 10,000건 기준: LIKE 200ms vs FTS 5ms 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let keyword: string; //검색 키워드 (필수) (default to undefined)
let categoryId: number; //카테고리 ID 필터 (선택사항) (optional) (default to undefined)
let sortBy: string; //정렬 방식 (relevance, latest, oldest) (optional) (default to 'relevance')
let page: number; //페이지 번호 (0부터 시작) (optional) (default to 0)
let size: number; //페이지 크기 (optional) (default to 20)

const { status, data } = await apiInstance.search(
    keyword,
    categoryId,
    sortBy,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **keyword** | [**string**] | 검색 키워드 (필수) | defaults to undefined|
| **categoryId** | [**number**] | 카테고리 ID 필터 (선택사항) | (optional) defaults to undefined|
| **sortBy** | [**string**] | 정렬 방식 (relevance, latest, oldest) | (optional) defaults to 'relevance'|
| **page** | [**number**] | 페이지 번호 (0부터 시작) | (optional) defaults to 0|
| **size** | [**number**] | 페이지 크기 | (optional) defaults to 20|


### Return type

**ApiResponseSearchResponse**

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

# **sendVerificationEmail**
> ApiResponseString sendVerificationEmail()

Firebase 이메일 인증 링크를 생성하여 발송합니다.  **⚠️ 권장 방법 (클라이언트):** ```javascript // React Native await user.sendEmailVerification();  // React Web import { sendEmailVerification } from \'firebase/auth\'; await sendEmailVerification(user); ```  **이 API 사용 시:** - 서버에서 커스텀 이메일 템플릿 사용 가능 - 이메일 발송을 서버에서 완전히 제어  Firebase 회원가입 후 이메일이 인증되지 않은 사용자에게 인증 메일을 발송합니다. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.sendVerificationEmail(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseString**

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

# **signUp**
> ApiResponseUserResponse signUp(signUpRequest)

서버에서 Firebase Authentication에 사용자를 생성하고 DB에 저장합니다.  **플로우:** 1. **회원가입 API 호출** (이 엔드포인트)    - 서버: Firebase에 사용자 생성 + DB 저장    - 서버: 이메일 인증 링크 발송  2. **클라이언트: Firebase 로그인**    ```javascript    // React Native 예시    import auth from \'@react-native-firebase/auth\';     const userCredential = await auth().signInWithEmailAndPassword(email, password);    const idToken = await userCredential.user.getIdToken();    ```  3. **클라이언트: FCM 토큰 발급**    ```javascript    import messaging from \'@react-native-firebase/messaging\';     const fcmToken = await messaging().getToken();    ```  4. **로그인 API 호출** (`POST /api/auth/login`)    ```json    {      \"idToken\": \"eyJhbGc...\",      \"fcmToken\": \"dW4f2...\"    }    ```  **중요:** - ⚠️ idToken과 fcmToken은 서버에서 발급할 수 없습니다 - ⚠️ 회원가입 후 반드시 위 2-4 단계를 진행해야 합니다 - 이메일 인증은 선택사항 (인증 전에도 로그인 가능)  **대안 방법 (클라이언트 우선):** 1. 클라이언트: Firebase SDK로 직접 회원가입 `createUserWithEmailAndPassword()` 2. 클라이언트: ID Token 발급 3. 서버: `/api/auth/login` 호출 시 자동으로 DB에 사용자 생성 

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    SignUpRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let signUpRequest: SignUpRequest; //

const { status, data } = await apiInstance.signUp(
    signUpRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signUpRequest** | **SignUpRequest**|  | |


### Return type

**ApiResponseUserResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **subscribeCategory**
> ApiResponseResponse subscribeCategory(subscribeRequest)

특정 카테고리를 구독하여 해당 카테고리의 공지사항 알림을 받을 수 있습니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    SubscribeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let subscribeRequest: SubscribeRequest; //

const { status, data } = await apiInstance.subscribeCategory(
    subscribeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscribeRequest** | **SubscribeRequest**|  | |


### Return type

**ApiResponseResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **unsubscribeCategory**
> ApiResponseVoid unsubscribeCategory()

카테고리 구독을 취소합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let categoryId: number; // (default to undefined)

const { status, data } = await apiInstance.unsubscribeCategory(
    categoryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **categoryId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseVoid**

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

# **updateBookmarkMemo**
> ApiResponseResponse updateBookmarkMemo(updateRequest)

저장한 북마크의 메모를 수정합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: number; // (default to undefined)
let updateRequest: UpdateRequest; //

const { status, data } = await apiInstance.updateBookmarkMemo(
    id,
    updateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateRequest** | **UpdateRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateFcmToken**
> ApiResponseVoid updateFcmToken(updateFcmTokenRequest)

푸시 알림을 위한 FCM 토큰을 업데이트합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateFcmTokenRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let updateFcmTokenRequest: UpdateFcmTokenRequest; //

const { status, data } = await apiInstance.updateFcmToken(
    updateFcmTokenRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateFcmTokenRequest** | **UpdateFcmTokenRequest**|  | |


### Return type

**ApiResponseVoid**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateNotification**
> ApiResponseResponse updateNotification(updateNotificationRequest)

구독한 카테고리의 알림을 활성화하거나 비활성화합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateNotificationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let categoryId: number; // (default to undefined)
let updateNotificationRequest: UpdateNotificationRequest; //

const { status, data } = await apiInstance.updateNotification(
    categoryId,
    updateNotificationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateNotificationRequest** | **UpdateNotificationRequest**|  | |
| **categoryId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateProfile**
> ApiResponseResponse updateProfile(updateProfileRequest)

사용자의 이름 등 프로필 정보를 수정합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let updateProfileRequest: UpdateProfileRequest; //

const { status, data } = await apiInstance.updateProfile(
    updateProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProfileRequest** | **UpdateProfileRequest**|  | |


### Return type

**ApiResponseResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateSettings**
> ApiResponseResponse updateSettings(updateSettingsRequest)

다크 모드, 시스템 알림 등 사용자 설정을 변경합니다.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateSettingsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let updateSettingsRequest: UpdateSettingsRequest; //

const { status, data } = await apiInstance.updateSettings(
    updateSettingsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSettingsRequest** | **UpdateSettingsRequest**|  | |


### Return type

**ApiResponseResponse**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

