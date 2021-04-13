const graphql = require('graphql')
const axios = require('axios')
    // const fs = require('fs')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

let jsonData = []
    // console.log("Hi")
    // fs.readFile('./data/covidzone.json', (err, data) => {
    //     if (err) {
    //         console.log(err.message)
    //         return
    //     }
    //     jsonData = JSON.parse(data)
    // })


//Caching API's
// addEventListener('load', () => {
//     if (localStorage.getItem('ncovindia_dataApi') !== null) {
//         axios.get('https://api.covid19india.org/data.json').then(res => {
//             let data = res.data 
//             localStorage.setItem('ncovindia_dataApi', JSON.stringify(data))
//             let date = new Date()
//             localStorage.setItem('ncovindia_timestamp',(date.getHours()+":"+date.getMinutes()))
//         })
//     }
// })

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
        countryName: { type: GraphQLString },
        countryCode: { type: GraphQLString },
        countrySlug: { type: GraphQLString },
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
                        stateCode: fetchedObj.statecode,
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
                            stateCode: fetchedObj[i].statecode,
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
        historical: {
            type: new GraphQLList(HistoricalType),
            args: {
                type: { type: GraphQLString, description: "Supply 'timeSeries' for time series data." },
                fromDate: {
                    type: GraphQLString,
                    description: "Supply from date in format: DD/MM"
                },
                toDate: { type: GraphQLString, description: "Supply date in format: DD/MM" }
            }, //Either timeSeries or daily based
            description: "Fetch India's historical cases.",
            resolve(parentValue, args) {
                return axios.get('https://api.covid19india.org/data.json').then(res => {
                    let data = res.data.cases_time_series
                    let month = ["January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"
                    ];
                    let from = args.fromDate && args.fromDate.split("/")[0] + " " + month[parseInt(args.fromDate.split("/")[1]) - 1]
                    let to = args.toDate && args.toDate.split("/")[0] + " " + month[parseInt(args.toDate.split("/")[1] - 1)]
                    let result = []
                    let startIndex = 0
                    let endIndex = 0
                    if (args.fromDate) {
                        for (let i in data) {
                            if (data[i].date.trim() === from) {
                                startIndex = i
                            }
                            if (data[i].date.trim() === to) {
                                endIndex = i
                                break;
                            }
                        }
                    }


                    if (args.type === "timeSeries") {
                        if (args.fromDate && args.toDate) {
                            if (args.fromDate !== null && args.toDate !== null) {

                                for (let i = startIndex; i <= endIndex; i++) {
                                    let obj = {
                                        date: data[i].date + "",
                                        cases: data[i].totalconfirmed + "",
                                        recovered: data[i].totalrecovered + "",
                                        deaths: data[i].totaldeceased + ""
                                    }
                                    result.push(obj)
                                    console.log(startIndex + " " + endIndex)
                                    console.log(from)
                                    console.log(to)
                                }
                                return result;
                            }
                        } else {
                            for (let i in data) {
                                let obj = {
                                    date: data[i].date + "",
                                    cases: data[i].totalconfirmed + "",
                                    recovered: data[i].totalrecovered + "",
                                    deaths: data[i].totaldeceased + ""
                                }
                                result.push(obj)
                            }
                            return result;
                        }


                    } else {
                        if (args.fromDate && args.toDate) {
                            for (let i = startIndex; i <= endIndex; i++) {
                                let obj = {
                                    date: data[i].date + "",
                                    cases: data[i].dailyconfirmed + "",
                                    recovered: data[i].dailyrecovered + "",
                                    deaths: data[i].dailydeceased + ""
                                }
                                result.push(obj)
                                    // console.log(startIndex + " " + endIndex)
                                    // console.log(from)
                                    // console.log(to)
                            }
                            return result;
                        } else {
                            for (let i in data) {
                                let obj = {
                                    date: data[i].date + "",
                                    cases: data[i].dailyconfirmed + "",
                                    recovered: data[i].dailyrecovered + "",
                                    deaths: data[i].dailydeceased + ""
                                }
                                result.push(obj)
                            }
                            return result;
                        }

                    }
                });
            }
        }
    })
});


const StateType = new GraphQLObjectType({
    name: 'State',
    fields: () => ({
        name: { type: GraphQLString },
        stateCode: { type: GraphQLString },
        cases: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        active: { type: GraphQLInt },
        todayCases: { type: GraphQLInt },
        todayDeaths: { type: GraphQLInt },
        todayRecovered: { type: GraphQLInt },
        lastupdated: { type: GraphQLString },
        historical: {
            type: new GraphQLList(HistoricalType),
            resolve(parentValue, args) {
                return axios.get("https://api.covid19india.org/states_daily.json").then(res => {
                    let data = res.data.states_daily

                    let stateCode = parentValue.stateCode
                        // console.log(stateCode)
                    let result = []
                    for (let i = 0; i < data.length; i += 3) {
                        let cases = data[i][stateCode.toLowerCase()]
                        let rec = data[i + 1][stateCode.toLowerCase()]
                        let dths = data[i + 2][stateCode.toLowerCase()]
                        let obj = {
                                date: data[i].date,
                                cases: cases,
                                recovered: rec,
                                deaths: dths
                            }
                            // console.log(obj)
                        result.push(obj)
                    }
                    console.log(result)
                    return result;

                });
            }
        },
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
                            stateName: fetchedObj.stateName,
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
        stateName: { type: GraphQLString },
        cases: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        active: { type: GraphQLInt },
        todayCases: { type: GraphQLInt },
        todayDeaths: { type: GraphQLInt },
        todayRecovered: { type: GraphQLInt },
        // zone: { type: GraphQLString },
        historical: {
            type: new GraphQLList(HistoricalType),
            resolve(parentValue, args) {
                return axios.get('https://api.covid19india.org/districts_daily.json').then(res => {
                    let data = res.data.districtsDaily

                    let stateName = parentValue.stateName
                    let distData = data[stateName][parentValue.name]
                    let result = []
                    for (let i in distData) {
                        let obj = {
                            date: distData[i].date + "",
                            cases: distData[i].confirmed + "",
                            recovered: distData[i].recovered + "",
                            deaths: distData[i].deceased + "",
                        }
                        result.push(obj)
                    }
                    console.log(result)
                    return result;
                });
            }
        }
    })
});

const HistoricalType = new GraphQLObjectType({
    name: 'Historical',
    fields: () => ({
        date: { type: GraphQLString },
        cases: { type: GraphQLString },
        recovered: { type: GraphQLString },
        deaths: { type: GraphQLString }

    })
})

const WorldType = new GraphQLObjectType({
    name: 'World',
    fields: () => ({
        lastupdated: { type: GraphQLString },
        cases: { type: GraphQLInt },
        todayCases: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        todayDeaths: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        todayRecovered: { type: GraphQLInt },
        country: {
            type: CountryType,
            args: {
                countryName: { type: GraphQLString, description: 'Fetch using Country Name' },
                countryCode: { type: GraphQLString, description: 'Fetch using Country Code' }
            },
            description: 'Fetch stats of particular countries',
            resolve(parentValue, args) {
                return axios.get('https://api.covid19api.com/summary').then(response => {
                    let data = response.data.Countries
                    let resData = {}
                    if (args.countryName !== null) {
                        resData = data.find(x => x.Country === args.countryName)
                    }
                    if (args.countryCode !== null) {
                        resData = data.find(x => x.CountryCode === args.countryCode)
                    }

                    let res = {
                        cases: resData.TotalConfirmed,
                        deaths: resData.TotalDeaths,
                        recovered: resData.TotalRecovered,
                        todayCases: resData.NewConfirmed,
                        todayDeaths: resData.NewDeaths,
                        todayRecovered: resData.NewRecovered,
                        countryName: resData.Country,
                        countryCode: resData.CountryCode,
                        countrySlug: resData.slug,
                        lastupdated: resData.Date
                    }
                    return res;
                });
            }

        }
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        world: {
            type: WorldType,
            resolve(parentValue, args) {
                return axios.get('https://api.covid19api.com/summary').then(resp => {
                    let resData = resp.data.Global

                    let res = {
                        cases: resData.TotalConfirmed,
                        deaths: resData.TotalDeaths,
                        recovered: resData.TotalRecovered,
                        todayCases: resData.NewConfirmed,
                        todayDeaths: resData.NewDeaths,
                        todayRecovered: resData.NewRecovered,
                        lastupdated: resData.Date
                    }
                    return res;
                });
            }
        },
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
            args: { stateName: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parentValue, args) {
                return axios.get('http://api.covid19india.org/data.json').then(res => {
                    let data = res.data
                    let stateName = args.stateName

                    let fetchedObj = data.statewise.filter(x => x.state.toLowerCase() === stateName.toLowerCase())[0]

                    let obj = {
                        name: fetchedObj.state,
                        stateCode: fetchedObj.statecode,
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
                            stateCode: fetchedObj[i].statecode,
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
            args: { stateName: { type: new GraphQLNonNull(GraphQLString) }, districtName: { type: new GraphQLNonNull(GraphQLString) } },
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
                        stateName: stateName,
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