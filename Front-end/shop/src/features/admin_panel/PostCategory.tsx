import { useState, useEffect } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Category } from "../../models/Category";
import { postCategoryAsync, selectCategory } from "../category/categorySlice";
import AdminProdNavigator from "../navigators/AdminProdNavigator";

const PostCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const category = useAppSelector(selectCategory);

  const [category_name, setCategoryName] = useState<string>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("category_name", category_name);

    const newCategory: Category = {
      id: category.id,
      category_name: category_name,
    };

    dispatch(postCategoryAsync(newCategory));
    setCategoryName("");
    navigate("/admin_panel/category_details/");
  };

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
        <Col md={9}>
          <br />
          <br />
          <h2>CATEGORIES</h2>
          <div style={{ height: "100px" }} />
          <h5>ADD CATEGORY</h5>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="formCategory"
              style={{
                position: "absolute",
                transform: " translateX(-20px) translateY(6px) ",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Category Name"
                onChange={(event) => setCategoryName(event.target.value)}
                required
              />
            </Form.Group>
            <br />
            <br />
            <br />
            <Button
              style={{
                width: "203px",
                position: "absolute",
                transform: "translateX(-20px)",
              }}
              variant="warning"
              type="submit"
            >
              Create New Category
            </Button>
            <Button
              onClick={() => {
                navigate(`/admin_panel/category_details/`);
              }}
              variant="secondary"
              style={{
                width: "100px",
                position: "absolute",
                transform: " translateX(28px) translateY(50px) ",
              }}
            >
              CANCLE
            </Button>
            <br />
            <br />
          </Form>
        </Col>
      </Container>

      <div style={{ height: "330px" }} />
    </div>
  );
};

export default PostCategory;
