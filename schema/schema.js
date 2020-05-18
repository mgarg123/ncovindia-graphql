const graphql = require('graphql')
const axios = require('axios')
const fs = require('fs')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

let jsonData = []
fs.readFile('./data/covidzone.json', (err, data) => {
    if (err) {
        console.log(err.message)
        return
    }
    jsonData = JSON.parse(data)
})


const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        cases: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        active: { type: GraphQLInt },
        todayCases: { type: GraphQLInt },
        todayDeaths: { type: GraphQLInt },
        todayRecovered: { type: GraphQLInt },
        lastupdated: { type: GraphQLString },
        totalAffectedStates: { type: GraphQLInt },
        state: {
            type: StateType,
            args: { stateName: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get('http://api.covid19india.org/data.json').then(res => {
                    let data = res.data
                    let stateName = args.stateName

                    let fetchedObj = data.statewise.filter(x => x.state.toLowerCase() === stateName.toLowerCase())[0]

                    let obj = {
                        name: fetchedObj.state,
                        cases: parseInt(fetchedObj.confirmed),
                        deaths: parseInt(fetchedObj.deaths),
                        recovered: parseInt(fetchedObj.recovered),
                        active: parseInt(fetchedObj.active),
                        todayCases: parseInt(fetchedObj.deltaconfirmed),
                        todayDeaths: parseInt(fetchedObj.deltadeaths),
                        todayRecovered: parseInt(fetchedObj.deltarecovered),
                        lastupdated: fetchedObj.lastupdatedtime
                    }
                    return obj;
                });
            }
        },
        states: {
            type: new GraphQLList(StateType),
            resolve(parentValue, args) {
                return axios.get('http://api.covid19india.org/data.json').then(res => {
                    let data = res.data
                    let stateName = args.stateName

                    let fetchedObj = data.statewise.filter(x => x.state !== "Total")
                    let result = []
                    for (let i in fetchedObj) {
                        let obj = {
                            name: fetchedObj[i].state,
                            cases: parseInt(fetchedObj[i].confirmed),
                            deaths: parseInt(fetchedObj[i].deaths),
                            recovered: parseInt(fetchedObj[i].recovered),
                            active: parseInt(fetchedObj[i].active),
                            todayCases: parseInt(fetchedObj[i].deltaconfirmed),
                            todayDeaths: parseInt(fetchedObj[i].deltadeaths),
                            todayRecovered: parseInt(fetchedObj[i].deltarecovered),
                            lastupdated: fetchedObj[i].lastupdatedtime
                        }
                        result.push(obj)
                    }
                    return result;
                });
            }
        }
    })
});


const StateType = new GraphQLObjectType({
    name: 'State',
    fields: () => ({
        name: { type: GraphQLString },
        cases: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        active: { type: GraphQLInt },
        todayCases: { type: GraphQLInt },
        todayDeaths: { type: GraphQLInt },
        todayRecovered: { type: GraphQLInt },
        lastupdated: { type: GraphQLString },
        districts: {
            type: new GraphQLList(DistrictType),
            resolve(parentValue, args) {
                return axios.get('https://api.covid19india.org/v2/state_district_wise.json').then(res => {
                    let data = res.data

                    let stateName = parentValue.name

                    let fetchedObj = data.filter(x => x.state.toLowerCase() === stateName.toLowerCase())[0]

                    // let fetchedState = jsonData.filter(x => x.state.toLowerCase() === stateName.toLowerCase())[0]

                    let resData = []
                    for (let i in fetchedObj.districtData) {
                        let obj = {
                            name: fetchedObj.districtData[i].district,
                            cases: fetchedObj.districtData[i].confirmed,
                            deaths: fetchedObj.districtData[i].deceased,
                            recovered: fetchedObj.districtData[i].recovered,
                            active: fetchedObj.districtData[i].active,
                            todayCases: fetchedObj.districtData[i].delta.confirmed,
                            todayDeaths: fetchedObj.districtData[i].delta.deceased,
                            todayRecovered: fetchedObj.districtData[i].delta.recovered
                        }
                        resData.push(obj)
                    }

                    // resData.sort((x, y) => x.name.localeCompare(y.name))
                    // fetchedState.districtData.sort((x, y) => x.district.localeCompare(y.district))

                    // for (let i in resData) {
                    //     for (let j in fetchedState.districtData) {
                    //         let dist1 = resData[i].name.split(/[\s-]/)
                    //         let dist2 = fetchedState.districtData[j].district.split(/[\s-]/)[0]
                    //         if (dist1.includes(dist2)) {
                    //             resData[i].zone = fetchedState.districtData[j].zone
                    //         }
                    //     }
                    // }

                    console.log(resData)
                        // console.log(fetchedState)
                    return resData;
                });
            }
        }
    })
});

const DistrictType = new GraphQLObjectType({
    name: 'District',
    fields: () => ({
        name: { type: GraphQLString },
        cases: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        active: { type: GraphQLInt },
        todayCases: { type: GraphQLInt },
        todayDeaths: { type: GraphQLInt },
        todayRecovered: { type: GraphQLInt },
        // zone: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        country: {
            type: CountryType,
            resolve(parentValue, args) {
                let result = {}
                return axios.get('https://api.covid19india.org/data.json').then(res => {
                    let data = res.data
                    let affectCount = data.statewise.length - 1
                    let obj = {
                        cases: parseInt(data.statewise[0].confirmed),
                        deaths: parseInt(data.statewise[0].deaths),
                        recovered: parseInt(data.statewise[0].recovered),
                        active: parseInt(data.statewise[0].active),
                        todayCases: parseInt(data.statewise[0].deltaconfirmed),
                        todayDeaths: parseInt(data.statewise[0].deltadeaths),
                        todayRecovered: parseInt(data.statewise[0].deltarecovered),
                        lastupdated: data.statewise[0].lastupdatedtime,
                        totalAffectedStates: affectCount
                    }
                    result = obj;
                    return result;
                });
            }
        },
        state: {
            type: StateType,
            args: { stateName: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get('http://api.covid19india.org/data.json').then(res => {
                    let data = res.data
                    let stateName = args.stateName

                    let fetchedObj = data.statewise.filter(x => x.state.toLowerCase() === stateName.toLowerCase())[0]

                    let obj = {
                        name: fetchedObj.state,
                        cases: parseInt(fetchedObj.confirmed),
                        deaths: parseInt(fetchedObj.deaths),
                        recovered: parseInt(fetchedObj.recovered),
                        active: parseInt(fetchedObj.active),
                        todayCases: parseInt(fetchedObj.deltaconfirmed),
                        todayDeaths: parseInt(fetchedObj.deltadeaths),
                        todayRecovered: parseInt(fetchedObj.deltarecovered),
                        lastupdated: fetchedObj.lastupdatedtime
                    }
                    return obj;
                });
            }
        },
        states: {
            type: new GraphQLList(StateType),
            resolve(parentValue, args) {
                return axios.get('http://api.covid19india.org/data.json').then(res => {
                    let data = res.data
                    let stateName = args.stateName

                    let fetchedObj = data.statewise.filter(x => x.state !== "Total")
                    let result = []
                    for (let i in fetchedObj) {
                        let obj = {
                            name: fetchedObj[i].state,
                            cases: parseInt(fetchedObj[i].confirmed),
                            deaths: parseInt(fetchedObj[i].deaths),
                            recovered: parseInt(fetchedObj[i].recovered),
                            active: parseInt(fetchedObj[i].active),
                            todayCases: parseInt(fetchedObj[i].deltaconfirmed),
                            todayDeaths: parseInt(fetchedObj[i].deltadeaths),
                            todayRecovered: parseInt(fetchedObj[i].deltarecovered),
                            lastupdated: fetchedObj[i].lastupdatedtime
                        }
                        result.push(obj)
                    }
                    return result;
                });
            }
        },
        district: {
            type: DistrictType,
            args: { stateName: { type: GraphQLString }, districtName: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get('https://api.covid19india.org/v2/state_district_wise.json').then(res => {
                    let data = res.data

                    let stateName = args.stateName
                    let districtName = args.districtName

                    let fetchedStateData = data.filter(x => x.state.toLowerCase() === stateName.toLowerCase())[0]
                    let fetchedObj = fetchedStateData.districtData.filter(x => x.district.toLowerCase() === districtName.toLowerCase())[0]

                    // let fetchedState = jsonData.filter(x => x.state.toLowerCase() === stateName.toLowerCase())[0]
                    // let fetchedObjs = fetchedState.districtData.filter(x => x.district.toLowerCase() === districtName.toLowerCase())[0]

                    let obj = {
                        name: fetchedObj.district,
                        cases: fetchedObj.confirmed,
                        deaths: fetchedObj.deceased,
                        recovered: fetchedObj.recovered,
                        active: fetchedObj.active,
                        todayCases: fetchedObj.delta.confirmed,
                        todayDeaths: fetchedObj.delta.deceased,
                        todayRecovered: fetchedObj.delta.recovered,
                        // zone: fetchedObjs.zone
                    }
                    return obj;
                });
            }
        }
    }

});

// function resolveStates(parentValue, args) {
//     return 
// }

module.exports = new GraphQLSchema({
    query: RootQuery
})