import Head from 'next/head'
import Link from 'next/link'
import '../statics/css/index.css'
import logo from '../statics/img/logo.png'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <meta name="title" content="Covid19 GraphQL API" />
        <meta name="description" content="A GraphQL based covid19 API. Get all details like total cases, deaths, recoveries of India. Get country, state and district level details. " />
        <meta name="keywords" content="covid19api, covid19 graphql api, graphql api, covid api, india covid19 api, corona virus api of india and world, corona api with state and district data, ncov api, covid19india api " />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        <title>Covid19 GraphQL API | Covid19 API by ncovindias</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <header>
        <div className="left-header">
          <div className="logo">
            <img src={logo} style={{ height: "42px", width: "42px" }} alt="" />
          </div>
          <div className="brand-name">
            <span>NCOV-INDIA</span>
          </div>
        </div>
        <div className="right-header">
          <div className="dashboard">
            <span><a href="https://ncovindias.xyz">Dashboard</a></span>
          </div>
        </div>
      </header>
      <main>
        <div className="api-details">
          <div className="main-title">
            <span>API</span>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Details</th>
                  <th>URL Endpoint</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><i className="fa fa-heart"></i></td>
                  <td>All data (Country,   State & District levels) for India</td>
                  <td>https://api.ncovindias.xyz/api/graphql</td>
                </tr>
                <tr>
                  <td><i className="fa fa-heart"></i></td>
                  <td>GraphQL Playground (GUI)</td>
                  <td><Link href="/api/graphql"><a>https://api.ncovindias.xyz/api/graphql</a></Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <hr id="api-table" /> */}
          <div className="api-docs">
            <div className="api-docs-title">
              <span>API USAGES & EXAMPLE</span>
            </div>
            <div className="queries-table">
              <div>
                <span>Available Queries</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Details</th>
                    <th>Parameters</th>
                    <th>Query</th>
                    <th>Query type</th>
                    <th>Fields</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Country level</td>
                    <td>-</td>
                    <td>country</td>
                    <td>RootQuery</td>
                    <td>cases,  deaths,  active,  recovered,  todayCases,  todayRecovered,  todayDeaths,  lastupdated,
                    totalAffectedStates,  state,  states,  historical
                    </td>
                  </tr>
                  <tr>
                    <td>State level (All)</td>
                    <td>-</td>
                    <td>states</td>
                    <td>RootQuery</td>
                    <td>
                      cases,  deaths,  recovered,  active, todayCases, todayRecovered, todayDeaths, lastupdated,
                      name, stateCode, states, historical, districts
                    </td>
                  </tr>
                  <tr>
                    <td>State level (by State)</td>
                    <td>stateName</td>
                    <td>state</td>
                    <td>RootQuery</td>
                    <td>cases, deaths, recovered, active, todayCases, todayRecovered, todayDeaths, lastupdated,
                      name, stateCode, states, historical, districts</td>
                  </tr>
                  <tr>
                    <td>District level (by district & state)</td>
                    <td>districtName & stateName</td>
                    <td>district</td>
                    <td>RootQuery</td>
                    <td>cases, deaths, recovered, todayCases, todayRecovered, todayDeaths, lastupdated,
                      name, stateName, historical</td>
                  </tr>
                  <tr>
                    <td>District level All (by state)</td>
                    <td>-</td>
                    <td>districts</td>
                    <td>-</td>
                    <td>cases,  deaths,  recovered,  todayCases,  todayRecovered,  todayDeaths,  lastupdated,
                      name,  stateName,  historical</td>
                  </tr>
                  <tr>
                    <td>Historical Data</td>
                    <td>-</td>
                    <td>historical</td>
                    <td>-</td>
                    <td>cases,  deaths,  recovered, date</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-container">
              <div className="available-fields-table">
                <div>
                  <span>
                    Available fields
                </span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>cases</td>
                      <td>Shows no. of confirmed cases</td>
                    </tr>
                    <tr>
                      <td>deaths</td>
                      <td>Shows no. of deaths</td>
                    </tr>
                    <tr>
                      <td>recovered</td>
                      <td>Shows no. of recoveries</td>
                    </tr>
                    <tr>
                      <td>active</td>
                      <td>Shows no. of patients active.</td>
                    </tr>
                    <tr>
                      <td>todayCases</td>
                      <td>Shows no. of cases for current date</td>
                    </tr>
                    <tr>
                      <td>todayRecovered</td>
                      <td>Shows no. of recoveries for current date</td>
                    </tr>
                    <tr>
                      <td>todayDeaths</td>
                      <td>Shows no. of deaths for current date</td>
                    </tr>
                    <tr>
                      <td>lastupdated</td>
                      <td>Last updated timestamp</td>
                    </tr>
                    <tr>
                      <td>stateName</td>
                      <td>Shows name of state in district query</td>
                    </tr>
                    <tr>
                      <td>date</td>
                      <td>Shows date in historical query</td>
                    </tr>
                    <tr>
                      <td>stateCode</td>
                      <td>Shows state code.</td>
                    </tr>
                    <tr>
                      <td>totalAffectedStates</td>
                      <td>Shows no. of states infected</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="api-framework">
                <div>
                  <span>Usage</span>
                </div>
                <div>
                  <span>Use with any REST API framework: </span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Framework/Library</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Axios</td>
                      <td>
                        <a href="https://medium.com/@stubailo/how-to-call-a-graphql-server-with-axios-337a94ad6cf9">Check Example</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Fetch</td>
                      <td>
                        <a href="https://moonhighway.com/fetching-data-from-a-graphql-api">Check Example</a>

                      </td>
                    </tr>
                    <tr>
                      <td>Android - Apollo Client</td>
                      <td>
                        <a href="https://github.com/apollographql/apollo-android">Check Example</a>
                      </td>
                    </tr>
                    <tr>
                      <td>iOS - Apollo Client</td>
                      <td>
                        <a href="https://www.apollographql.com/docs/ios/">Check Example</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="api-docs-container">
              <div className="title">Examples</div>
              <div className="box-container">
                <div className="box">
                  <div className="query-title">
                    <span>Get total cases in India</span>
                  </div>
                  <div className="code-demo">
                    <pre>
                      {'{'}<br />
                      <span id="qry">country</span> {'{'}<br />
                      <span id="qry">         cases</span><br />
                      <span id="qry">         deaths</span> <br />
                      <span id="qry">         recovered</span> <br />
                      <span id="qry">         active</span> <br />
                      <span id="qry">         todayCases</span> <br />
                      <span id="qry">         todayRecovered</span> <br />
                      <span>      {'}'}</span><br />
                      {'}'}
                    </pre>

                  </div>
                </div>
                <div className="box">
                  <div className="query-title">
                    <span>Get details of specific State/UT</span>
                  </div>
                  <div className="code-demo">
                    <pre>
                      {'{'}<br />
                      <span id="qry">state</span> (<span id="qry">stateName</span>:"Maharashtra") {'{'}<br />
                      <span id="qry">         cases</span><br />
                      <span id="qry">         deaths</span> <br />
                      <span id="qry">         recovered</span> <br />
                      <span id="qry">         lastupdated</span> <br />
                      <span id="qry">         todayCases</span> <br />
                      <span id="qry">         todayRecovered</span> <br />
                      <span>      {'}'}</span><br />
                      {'}'}
                    </pre>

                  </div>
                </div>
                <div className="box">
                  <div className="query-title">
                    <span>Get historical cases(Daily basis) of India</span>
                  </div>
                  <div className="code-demo">
                    <pre>
                      {'{'}<br />
                      <span id="qry">country</span> {'{'}<br />
                      <span id="qry">         historical</span> {'{'}<br />
                      <span id="qry">             date</span><br />
                      <span id="qry">             cases</span><br />
                      <span id="qry">             deaths</span> <br />
                      <span id="qry">             recovered</span> <br />
                      <span>        {'}'}</span><br />
                      <span>    {'}'}</span><br />
                      {'}'}
                    </pre>

                  </div>
                </div>
                <div className="box">
                  <div className="query-title">
                    <span>Get historical cases (Time Series) of India</span>
                  </div>
                  <div className="code-demo">
                    <pre>
                      {'{'}<br />
                      <span id="qry">country</span> {'{'}<br />
                      <span id="qry">         historical</span> (<span id="qry">type</span>:"timeSeries") {'{'}<br />
                      <span id="qry">             date</span><br />
                      <span id="qry">             cases</span><br />
                      <span id="qry">             deaths</span> <br />
                      <span id="qry">             recovered</span> <br />
                      <span>        {'}'}</span><br />
                      <span>    {'}'}</span><br />
                      {'}'}
                    </pre>

                  </div>
                </div>
                <div className="box">
                  <div className="query-title">
                    <span>Get historical cases (Datewise) of India</span>
                  </div>
                  <div className="code-demo">
                    <pre>
                      {'{'}<br />
                      <span id="qry">country</span> {'{'}<br />
                      <span id="qry">         historical</span> (<span id="qry">from</span>:"31/01", <span id="qry">to</span>:"20/03") {'{'}<br />
                      <span id="qry">             date</span><br />
                      <span id="qry">             cases</span><br />
                      <span id="qry">             deaths</span> <br />
                      <span id="qry">             recovered</span> <br />
                      <span>        {'}'}</span><br />
                      <span>    {'}'}</span><br />
                      {'}'}
                    </pre>

                  </div>
                </div>
                <div className="box">
                  <div className="query-title">
                    <span>Get details of all states</span>
                  </div>
                  <div className="code-demo">
                    <pre>
                      {'{'}<br />
                      <span id="qry">states</span> {'{'}<br />
                      <span id="qry">         name</span><br />
                      <span id="qry">         cases</span><br />
                      <span id="qry">         deaths</span> <br />
                      <span id="qry">         active</span> <br />
                      <span id="qry">         recovered</span> <br />
                      <span id="qry">         lastupdated</span> <br />
                      <span id="qry">         todayCases</span> <br />
                      <span id="qry">         todayRecovered</span> <br />
                      <span>      {'}'}</span><br />
                      {'}'}
                    </pre>

                  </div>
                </div>
                <div className="box">
                  <div className="query-title">
                    <span>Get details of specific district</span>
                  </div>
                  <div className="code-demo">
                    <pre>
                      {'{'}<br />
                      <span id="qry">district</span> (<span id="qry">stateName</span>:"Bihar",  <br />
                      <span id="qry">       districtName</span>:"Patna") {'{'}<br />
                      <span id="qry">                 cases</span><br />
                      <span id="qry">                 deaths</span> <br />
                      <span id="qry">                 recovered</span> <br />
                      <span id="qry">                 todayCases</span> <br />
                      <span id="qry">                 todayRecovered</span> <br />
                      <span>       {'}'}</span><br />
                      {'}'}
                      <span>{" "}</span>
                      <span>{" "}</span>
                    </pre>

                  </div>
                </div>
                <div className="box">
                  <div className="query-title">
                    <span>Get details of all states with districts</span>
                  </div>
                  <div className="code-demo">
                    <pre>
                      {'{'}<br />
                      <span id="qry">states</span> {'{'}<br />
                      <span id="qry">         districts</span> {'{'}<br />
                      <span id="qry">             cases</span><br />
                      <span id="qry">             deaths</span> <br />
                      <span id="qry">             recovered</span> <br />
                      <span id="qry">             todayCases</span> <br />
                      <span id="qry">             todayRecovered</span> <br />
                      <span>          {'}'}</span><br />
                      <span>     {'}'}</span><br />
                      {'}'}
                    </pre>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </main>
      <footer>
        <div className="footer-left">
          <span>&copy;2020 All Rights Reserved </span>
        </div>
        <div className="footer-right">
          <span>
            <a href="https://linkedin.com/in/imgarg">Developed by Manish Garg.</a>
          </span>
        </div>
      </footer>
    </div>

  )
}
