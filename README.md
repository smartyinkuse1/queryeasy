# What is this?

Get perfect queries for An express Mongoose mongoDb, This allows you to :-


- sort records
- select database fields
- paginate documents

all as query params

you can also **populate reference fields**

# Installation

`npm i query-easy --save`

Then...

```
import { queryEasy } from 'query-easy'
const User = import('./path')



router.route('/)
    .get(
        queryEasy({
        model: User,
        customQuery: {
            age: { $gt: '50' }
        },
        populateFields: [{
            path: 'field',
            select: '-_id -_V'
        }]
    })
    )
```

## Options

query-easy supports 3 options

* *model* - Mongoose Document Model (Required)
* *customQuery* - **Object** of mongoose queries(Optional)
* *populateFields* - **Array** of mongoose populate (Optional)