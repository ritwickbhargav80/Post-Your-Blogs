import React, { Component } from "react";
import { faTrashAlt, faLaugh } from "@fortawesome/free-regular-svg-icons";
import { faLaughWink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PostBlogs extends Component {
  state = {
    myName: "Ritwick Bhargav",
    heading: "",
    value: "",
    blogs: [
      {
        id: 1,
        name: "Ritwick Bhargav",
        heading: "Introduction to React!",
        value: "Hello Everyone, This is my first blog. Hope you like it. Let's discuss about React and how's it different from other technologies. So, React makes it painless to create interactive User Interfaces. You can design simple views for each state in your application, and React will render the exact components as the data changes.",
        isLike: true,
        isNew: false,
        likeCount: 50,
        comment: [
          {
            id: 1,
            name: "",
            message: "",
          },
        ],
      },
      {
        id: 2,
        name: "Aakash Goel",
        heading: "React Native!",
        value: "Let's deep dive into the React Native knowledge pool. First of all, let's see what React Native is? So, React Native helps to create Android as well as iOS native apps using React. One of the feature that I like the most is fast rendering i.e., see your output as soon as you save your code.",
        isLike: false,
        isNew: false,
        likeCount: 10,
        comment: [
          {
            id: 1,
            name: "",
            message: "",
          },
          {
            id: 2,
            name: "Ritwick Bhargav",
            message: "Nice information!",
            isLike: false,
            likeCount: 5
          }
        ],
      },
    ],
  };

  headingInput = (event) => {
    this.setState({ heading: event.target.value });
  };

  textFieldInput = (event) => {
    this.setState({ value: event.target.value });
  };

  handleDisabled() {
    if (this.state.heading === "" || this.state.value === "") return true;
    return false;
  }

  handleBlogs() {
    let maxId = 0;
    this.state.blogs.forEach((blog) => {
      if (blog.id > maxId) maxId = blog.id;
    });
    let tempBlog = {
      id: maxId + 1,
      name: this.state.myName,
      heading: this.state.heading,
      value: this.state.value,
      isLike: false,
      isNew: true,
      likeCount: 0,
      comment: [
        {
          id: 1,
          name: "",
          message: "",
        },
      ],
    };
    this.setState({ blogs: [...this.state.blogs, tempBlog] });
    document.getElementById("postIt-1").value = "";
    document.getElementById("postIt-2").value = "";
    const heading = "", value = "";
    this.setState({ heading, value });
  }

  deleteIcon = (blog, comment) => {
    return blog.name === this.state.myName ||
      comment.name === this.state.myName ? (
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="delete text-danger"
          onClick={() => this.handleDelete(blog, comment)}
        />
      ) : (
        <React.Fragment />
      );
  };

  printMessage = (name, message) => {
    name = name.toLowerCase();
    name = "@" + name.replace(/\s/g, '_') + " ";
    return <p><span className="bold">{name}</span>{message}</p>;
  };

  handleDelete = (blog, comment) => {
    let blogs;
    if (!comment.id) {
      blogs = this.state.blogs.filter((blog1) => blog1 !== blog);
    } else {
      const i = this.state.blogs.findIndex(
        (blog1) => blog1 === blog
      );
      const newComments = this.state.blogs[i].comment.filter(
        (comment1) => comment1 !== comment
      );
      blogs = [...this.state.blogs];
      blogs[i].comment = newComments;
    }
    this.setState({ blogs });
  };

  handleLike = (blog) => {
    let blogs = [...this.state.blogs];
    const index = blogs.indexOf(blog);
    blog.isLike = !blog.isLike;
    if (blog.isLike) blog.likeCount += 1;
    else blog.likeCount -= 1;
    blogs[index] = blog;
    this.setState({ blogs });
  };

  handleComment = (blog) => {
    let blogs = [...this.state.blogs];
    const i = blogs.indexOf(blog);
    const j = blog.comment.findIndex((x) => x.id === 1);
    let tempComment = blog.comment.find((x) => x.id === 1);
    let maxId = 0;
    blogs[i].comment.forEach((commentObject) => {
      if (commentObject.id > maxId) maxId = commentObject.id;
    });
    const comment = [
      ...blogs[i].comment,
      { id: maxId + 1, name: tempComment.name, message: tempComment.message, isLike: false, likeCount: 0 },
    ];
    blogs[i].comment = comment;
    this.setState({ blogs });
    document.getElementById(blog.id).value = "";
    blogs[i].comment[j].name = "";
    blogs[i].comment[j].message = "";
  };

  handleChange = (blog, event) => {
    let blogs = [...this.state.blogs];
    const i = blogs.indexOf(blog);
    let j = blog.comment.findIndex((x) => x.id === 1);
    let updatedComment = blog.comment.find((x) => x.id === 1);
    updatedComment.name = this.state.myName;
    updatedComment.message = event.target.value;
    if (event.target.value === "") updatedComment.name = "";
    blogs[i].comment[j] = updatedComment;
    this.setState({ blogs });
  };

  handleCommentDisabled = (blog) => {
    let tempComment = blog.comment.find((x) => x.id === 1);
    if (tempComment.message === "") return true;
    return false;
  };

  printComments = (blog) => {
    const commentArray = blog.comment.filter((comment) => comment.id !== 1);
    if (commentArray.length !== 0)
      return commentArray.map((comment) => (
        <React.Fragment key={comment.id}>
          <div className="card">
            <div className="card-header font-weight-bold">
              {comment.name}
              {this.deleteIcon(blog, comment)}
            </div>
            <div className="card-body">
              <p className="card-text">{this.printMessage(blog.name, comment.message)}</p>
            </div>
            <div className="card-footer">
              <div>
                {comment.isLike ? (
                  <FontAwesomeIcon
                    icon={faLaughWink}
                    className="d-inline laughWinkFace"
                    onClick={() => this.handleLike(comment)}
                  />
                ) : (
                    <FontAwesomeIcon
                      icon={faLaugh}
                      className="d-inline laughFace"
                      onClick={() => this.handleLike(comment)}
                    />
                  )}
                <span className="d-inline badge badge-pill badge-secondary">
                  {comment.likeCount}
                </span>
              </div>
            </div>
          </div>
          <br />
        </React.Fragment>
      ));
    return <p>Be the first one to comment!</p>;
  };

  render() {
    return (
      <div className="container">
        <p className="text">
          This is a <span className="bold">React</span> based frontend only textual blog system.
        </p>
        <h2 className="m-2">Post Your Blogs Here:</h2>
        <input id="postIt-1" type="text" className="form-control" placeholder="Mention your title here..." aria-label="Username" aria-describedby="basic-addon1" onChange={this.headingInput} />
        <div className="input-group text-area">
          <textarea
            id="postIt-2"
            rows="5"
            className="form-control"
            aria-label="With textarea"
            placeholder="Share your blogs here..."
            onChange={this.textFieldInput}
          ></textarea>
        </div>
        <button
          className="btn btn-sm btn-primary submit"
          disabled={this.handleDisabled()}
          onClick={() => this.handleBlogs()}
        >
          Submit
        </button>
        <br />
        <br />
        {this.state.blogs.map((blog) => (
          <React.Fragment key={blog.id}>
            <div className="card">
              <div className="card-header">
                {blog.name} {blog.isNew ? <span className="badge badge-primary new-badge">New</span> : <React.Fragment />}
                {this.deleteIcon(blog, {})}
              </div>
              <div className="card-body">
                <h5 className="card-title">{blog.heading}</h5>
                <p className="card-text">{blog.value}</p>
              </div>
              <div className="card-footer">
                <div>
                  {blog.isLike ? (
                    <FontAwesomeIcon
                      icon={faLaughWink}
                      className="d-inline laughWinkFace"
                      onClick={() => this.handleLike(blog)}
                    />
                  ) : (
                      <FontAwesomeIcon
                        icon={faLaugh}
                        className="d-inline laughFace"
                        onClick={() => this.handleLike(blog)}
                      />
                    )}
                  <span className="d-inline badge badge-pill badge-secondary">
                    {blog.likeCount}
                  </span>
                  <div className="d-inline innerDiv">
                    <input
                      id={blog.id}
                      type="text"
                      className="d-inline form-control m-2 commentBox"
                      aria-label="Text input with checkbox"
                      placeholder="Post your comments here..."
                      onChange={(e) => this.handleChange(blog, e)}
                    />
                    <button
                      className="btn btn-sm btn-primary comment"
                      disabled={this.handleCommentDisabled(blog)}
                      onClick={() => this.handleComment(blog)}
                    >
                      Comment
                    </button>
                  </div>
                </div>
                <div className="m-2">{this.printComments(blog)}</div>
              </div>
            </div>
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default PostBlogs;
