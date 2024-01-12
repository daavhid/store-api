const Products = require('../models/product')


const getAllProductStatic = async(req,res)=>{
    const search = 'a'
    const products = await Products.find({}).select('name price company')
    res.status(200).json({products:products,
    name:{$regex:search,$options:'i'}})
}
const getAllProducts = async(req,res)=>{
    const {featured,company,name,sort,fields,numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured=== 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name,$options:'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regex = /\b(<|>|>=|<=|=)\b/g
        let filter = numericFilters.replace(regex,(match)=>
             `-${operatorMap[match]}-` 
        )
        filter = filter.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-')
            queryObject[field] = {[operator]:Number(value)}
        })
        
    }
    console.log(queryObject)
    let result =  Products.find(queryObject )
    if(sort){
        sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if(fields){
        fieldSort = fields.split(',').join(' ')
        result = result.select(fieldSort)
    }
    
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) *limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({products, nbHits:products.length })
} 

module.exports = {getAllProductStatic,getAllProducts}