import Tables from '../../SharedUI/Table/Tables';

const Product_details = (content) => {
    return (
        <>
            <Tables title="Products Table" 
            trContent='
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
                <th scope="col" />'

            tableContent='
            <tr>
            <th scope="row">
              {content.}
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>'    
            />
        </>
    )
}

export default Product_details;