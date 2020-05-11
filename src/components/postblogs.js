import React, { Component } from "react";
import { faTrashAlt, faLaugh } from "@fortawesome/free-regular-svg-icons";
import { faLaughWink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PostBlogs extends Component {
  state = {
    myName: "Ritwick Bhargav",
    value: "",
    blogs: [
      {
        id: 1,
        name: "Ritwick Bhargav",
        value: "Hello Everyone, This is my first blog. Hope you like it. Let's discuss about React and how's it different from other technologies. So, React makes it painless to create interactive User Interfaces. You can design simple views for each state in your application, and React will render the exact components as the data changes.",
        isLike: true,
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
        value: "Let's deep dive into the React Native knowledge pool. First of all, let's see what React Native is? So, React Native helps to create Android as well as iOS native apps using React. One of the feature that I like the most is fast rendering i.e., see your output as soon as you save your code.",
        isLike: false,
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
          }
        ],
      },
    ],
  };

  textFieldInput = (event) => {
    this.setState({ value: event.target.value });
  };

  handleDisabled() {
    if (this.state.value === "") return true;
    return false;
  }

  handleBlogs() {
    let maxId = 0;
    this.state.blogs.forEach((thought) => {
      if (thought.id > maxId) maxId = thought.id;
    });
    let tempThought = {
      id: maxId + 1,
      name: this.state.myName,
      value: this.state.value,
      isLike: false,
      likeCount: 0,
      comment: [
        {
          id: 1,
          name: "",
          message: "",
        },
      ],
    };
    this.setState({ blogs: [...this.state.blogs, tempThought] });
    document.getElementById("postIt").value = "";
    const value = "";
    this.setState({ value });
  }

  deleteIcon = (thought, comment) => {
    return thought.name === this.state.myName ||
      comment.name === this.state.myName ? (
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="delete text-danger"
          onClick={() => this.handleDelete(thought, comment)}
        />
      ) : (
        <React.Fragment />
      );
  };

  handleDelete = (thought, comment) => {
    let blogs;
    if (!comment.id) {
      blogs = this.state.blogs.filter((thought1) => thought1 !== thought);
    } else {
      const i = this.state.blogs.findIndex(
        (thought1) => thought1 === thought
      );
      const newComments = this.state.blogs[i].comment.filter(
        (comment1) => comment1 !== comment
      );
      blogs = [...this.state.blogs];
      blogs[i].comment = newComments;
    }
    this.setState({ blogs });
  };

  handleLike = (thought) => {
    let blogs = [...this.state.blogs];
    const index = blogs.indexOf(thought);
    thought.isLike = !thought.isLike;
    if (thought.isLike) thought.likeCount += 1;
    else thought.likeCount -= 1;
    blogs[index] = thought;
    this.setState({ blogs });
  };

  handleComment = (thought) => {
    let blogs = [...this.state.blogs];
    const i = blogs.indexOf(thought);
    const j = thought.comment.findIndex((x) => x.id === 1);
    let tempComment = thought.comment.find((x) => x.id === 1);
    let maxId = 0;
    blogs[i].comment.forEach((commentObject) => {
      if (commentObject.id > maxId) maxId = commentObject.id;
    });
    const blogs1 = [
      ...blogs[i].comment,
      { id: maxId + 1, name: tempComment.name, message: tempComment.message },
    ];
    blogs[i].comment = blogs1;
    this.setState({ blogs });
    document.getElementById(thought.id).value = "";
    blogs[i].comment[j].name = "";
    blogs[i].comment[j].message = "";
  };

  handleChange = (thought, event) => {
    let blogs = [...this.state.blogs];
    const i = blogs.indexOf(thought);
    let j = thought.comment.findIndex((x) => x.id === 1);
    let updatedComment = thought.comment.find((x) => x.id === 1);
    updatedComment.name = this.state.myName;
    updatedComment.message = event.target.value;
    if (event.target.value === "") updatedComment.name = "";
    blogs[i].comment[j] = updatedComment;
    this.setState({ blogs });
  };

  handleCommentDisabled = (thought) => {
    let tempComment = thought.comment.find((x) => x.id === 1);
    if (tempComment.message === "") return true;
    return false;
  };

  printComments = (thought) => {
    const commentArray = thought.comment.filter((comment) => comment.id !== 1);
    if (commentArray.length !== 0)
      return commentArray.map((comment) => (
        <React.Fragment key={comment.id}>
          <div className="card">
            <div className="card-header font-weight-bold">
              {comment.name}
              {this.deleteIcon(thought, comment)}
            </div>
            <div className="card-body">
              <p className="card-text">{comment.message}</p>
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
        <div className="input-group text-area">
          <textarea
            id="postIt"
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
        {this.state.blogs.map((thought) => (
          <React.Fragment key={thought.id}>
            <div className="card">
              <div className="card-header">
                {thought.name}
                {this.deleteIcon(thought, {})}
              </div>
              <div className="card-body">
                <p className="card-text">{thought.value}</p>
              </div>
              <div className="card-footer">
                <div>
                  {thought.isLike ? (
                    <FontAwesomeIcon
                      icon={faLaughWink}
                      className="d-inline laughWinkFace"
                      onClick={() => this.handleLike(thought)}
                    />
                  ) : (
                      <FontAwesomeIcon
                        icon={faLaugh}
                        className="d-inline laughFace"
                        onClick={() => this.handleLike(thought)}
                      />
                    )}
                  <span className="d-inline badge badge-pill badge-secondary">
                    {thought.likeCount}
                  </span>
                  <div className="d-inline innerDiv">
                    <input
                      id={thought.id}
                      type="text"
                      className="d-inline form-control m-2 commentBox"
                      aria-label="Text input with checkbox"
                      placeholder="Post your comments here..."
                      onChange={(e) => this.handleChange(thought, e)}
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={this.handleCommentDisabled(thought)}
                      onClick={() => this.handleComment(thought)}
                    >
                      Comment
                    </button>
                  </div>
                </div>
                <div className="m-2">{this.printComments(thought)}</div>
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
