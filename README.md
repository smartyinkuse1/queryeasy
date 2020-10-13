# What is this?

Get perfect queries for An express Mongoose mongoDb, This allows you to :-


- sort records
- select database fields
- paginate documents

all as query params

you can also **populate reference fields**

# Installation

`npm i query-easy --save`

#### Then...


###### Router
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

###### Controller
```
    //Access the .results properties of the res object

    const getRquest = async(req, res, next) => {
        return res.status(200).json(res.results)
    }

```

#### Finally!!!!

###### Send your requests

* Supported queryParams are fields of the Outline Model
* *Select* - Select queryparams is **select**
* *Sort* - Sort queryparams is **sort**
* *Pagination* - pagination queryparams are **page** and **limit**
* queries like $gt, $lte are represented with "[gt], [lte]"

`GET \api\v1\?name=Isaac&location.state=Lagos`

`GET \api\v1\?age[gte]=5`

`GET \api\v1\?select=name,age,location&sort=age`

`GET \api\v1\?page=1&limit=10`


## Options

query-easy supports 3 options

* *model* - Mongoose Document Model (Required)
* *customQuery* - **Object** of mongoose queries(Optional)
* *populateFields* - **Array** of mongoose populate (Optional)

