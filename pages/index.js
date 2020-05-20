import Head from 'next/head'
import Link from 'next/link'
import '../statics/css/index.css'
import logo from '../statics/img/logo.png'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>GraphQL API - Covid19 API by ncovindias.xyz</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <header>
        <div className="logo">
          <img src={logo} style={{ height: "42px", width: "42px" }} alt="" />
        </div>
        <div className="brand-name">
          <span>NCOV-INDIA</span>
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
            {/* <div className="api-docs-container">
              <div className="api-docs-box">
                <div className="api-docs-title">
                  <span>Query for all cases</span>
                </div>
                <div className="api-docs-code">
                  <div>
                    <code>

                    </code>
                  </div>
                </div>
              </div>
            </div> */}

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
