import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = (props) => {
    const navigate = useNavigate();
    let { currentUser, setCurrentUser } = props;
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [price, setPrice] = useState(0);
    let [eMsg, setEMsg] = useState("");

    const handleTakeToLogin = () => {
        navigate("/login")
    };
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleChangeDesciption = (e) => {
        setDescription(e.target.value);
    };
    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    };
    const postCourse = () => {
        CourseService.post(title, description, price)
            .then(() => {
                window.alert("New course has been created.");
                navigate("/course")
            })
            .catch(err => {
                console.log(err.response);
                setEMsg(err.response.data);
            })
    }
    
    return (
        <div style={{ padding: "3rem" }}>
          {!currentUser && (
            <div>
              <p>You must login first before posting a new course.</p>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleTakeToLogin}
              >
                Take me to login page.
              </button>
            </div>
          )}
          {currentUser && currentUser.user.role !== "instructor" && (
            <div>
              <p>Only instrcutors can post new courses.</p>
            </div>
          )}
          {currentUser && currentUser.user.role == "instructor" && (
            <div className="form-group">
              <label for="exampleforTitle">Title</label>
              <input
                name="title"
                type="text"
                className="form-control"
                id="exampleforTitle"
                onChange={handleChangeTitle}
              />
              <br />
              <label for="exampleforContent">Content</label>
              <textarea
                className="form-control"
                id="exampleforContent"
                aria-describedby="emailHelp"
                name="content"
                onChange={handleChangeDesciption}
              />
              <br />
              <label for="exampleforPrice">Price</label>
              <input
                name="price"
                type="number"
                className="form-control"
                id="exampleforPrice"
                onChange={handleChangePrice}
              />
              <br />
              <button className="btn btn-primary" onClick={postCourse}>
                Submit
              </button>
              <br />
              <br />
              {eMsg && (
                <div className="alert alert-warning" role="alert">
                  {eMsg}
                </div>
              )}
            </div>
          )}
        </div>
      );
    };

export default PostCourseComponent;