import { useEffect, useState } from "react";
import { Button, Col, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Category } from "../../models/Category";
import {
  deleteCategoryAsync,
  getCategoryAsync,
  selectCategories,
} from "../category/categorySlice";
import AdminProdNavigator from "../navigators/AdminProdNavigator";

const PanelCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategoryAsync());
  }, [dispatch]);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 110) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Container>
        <br />
        <br />
        <h2>CATEGORIES</h2>
        <div style={{ height: "100px" }} />
        <h5>CATEGORY LIST</h5>
        <br />
        {isScrolling ? (
          <div style={{ position: "absolute", top: 380 }}>
            <AdminProdNavigator />
          </div>
        ) : (
          <div style={{ position: "absolute" }}>
            <AdminProdNavigator />
          </div>
        )}
        <Col xs={9}>
          <Table striped bordered hover>
            <thead>
              <Button
                variant="warning"
                style={{
                  textAlign: "left",
                  position: "absolute",
                  transform: " translateX(826px) translateY(-50px) ",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/admin_panel/post_category/`}
                >
                  Add Category
                </Link>
              </Button>
              <tr
                style={{
                  backgroundColor: "#5A5A5A",
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <th>Category ID</th>
                <th>Category Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: Category) => (
                <tr key={category.id}>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {category.id}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {category.category_name}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    <Button
                      style={{
                        color: "blue",
                        border: "none",
                        background: "none",
                      }}
                      onClick={() =>
                        navigate(`/admin_panel/update_category/${category.id}`)
                      }
                    >
                      Edit
                    </Button>{" "}
                    |{" "}
                    <Button
                      style={{
                        color: "red",
                        border: "none",
                        background: "none",
                      }}
                      onClick={() => dispatch(deleteCategoryAsync(category.id))}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <div style={{ height: "134px" }} />
      </Container>
    </div>
  );
};

export default PanelCategories;
