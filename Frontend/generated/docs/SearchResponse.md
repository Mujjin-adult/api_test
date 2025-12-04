# SearchResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**results** | [**Array&lt;SearchResult&gt;**](SearchResult.md) |  | [optional] [default to undefined]
**keyword** | **string** |  | [optional] [default to undefined]
**totalCount** | **number** |  | [optional] [default to undefined]
**currentPage** | **number** |  | [optional] [default to undefined]
**pageSize** | **number** |  | [optional] [default to undefined]
**totalPages** | **number** |  | [optional] [default to undefined]
**hasNext** | **boolean** |  | [optional] [default to undefined]
**hasPrevious** | **boolean** |  | [optional] [default to undefined]
**searchTimeMs** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { SearchResponse } from './api';

const instance: SearchResponse = {
    results,
    keyword,
    totalCount,
    currentPage,
    pageSize,
    totalPages,
    hasNext,
    hasPrevious,
    searchTimeMs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
