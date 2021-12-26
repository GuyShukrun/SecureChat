import React from "react";
import "./chat.css";
import { useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import Message from "../../components/Message/Message";
export default function Chat({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  // return (
  //   <div>
  //     <button onClick={handleLogout}>logout</button>
  //   </div>
  // );
  return (
    <div className="container h-100">
      <div className="row no-gutters ">
        <div className="col-4 border-right">
          <div className="settings-tray">
            <img
              className="rounded-circle profile-img"
              src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg"
              alt="User's profile"
            />
            <MenuIcon className="settingsIcon " />
          </div>
          <div className="search-box">
            <div className="input-group rounded">
              <span className="input-group-text border-0 bg-white">
                <SearchIcon className="bg-white text-secondary" />
              </span>
              <input
                type="search"
                className="form-control rounded border-0 shadow-none"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="conversations-container bg-white ">
            <div className="conversation bg-white">
              <img
                className="profile-img rounded-circle img-fluid"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div className="conversation-user-text  bg-white">
                <h6 className=" user-fullname bg-white">User fullname</h6>
                <p className="text-muted  message-preview bg-white">
                  Last message preview
                </p>
              </div>
              <span className="time text-muted bg-white small float-right">
                13:21
              </span>
            </div>
            <hr />

            <div className="conversation bg-white">
              <img
                className="profile-img rounded-circle img-fluid"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div className="conversation-user-text bg-white ">
                <h6 className="bg-white user-fullname">User fullname</h6>
                <p className="text-muted bg-white message-preview">
                  Last message preview
                </p>
              </div>
              <span className="time text-muted small bg-white float-right">
                13:21
              </span>
            </div>
            <hr />

            <div className="conversation bg-white">
              <img
                className="profile-img rounded-circle img-fluid"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div className="conversation-user-text bg-white ">
                <h6 className="bg-white user-fullname">User fullname</h6>
                <p className="text-muted bg-white message-preview">
                  Last message preview
                </p>
              </div>
              <span className="time text-muted small bg-white float-right">
                13:21
              </span>
            </div>
            <hr />

            <div className="conversation bg-white">
              <img
                className="profile-img rounded-circle img-fluid"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div className="conversation-user-text bg-white ">
                <h6 className="bg-white user-fullname">User fullname</h6>
                <p className="text-muted bg-white message-preview">
                  Last message preview
                </p>
              </div>
              <span className="time text-muted small bg-white float-right">
                13:21
              </span>
            </div>
            <hr />

            <div className="conversation bg-white">
              <img
                className="profile-img rounded-circle img-fluid"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div className="conversation-user-text bg-white ">
                <h6 className="bg-white user-fullname">User fullname</h6>
                <p className="text-muted bg-white message-preview">
                  Last message preview
                </p>
              </div>
              <span className="time text-muted small bg-white float-right">
                13:21
              </span>
            </div>
            <hr />

            <div className="conversation bg-white">
              <img
                className="profile-img rounded-circle img-fluid"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div className="conversation-user-text bg-white ">
                <h6 className="bg-white user-fullname">User fullname</h6>
                <p className="text-muted bg-white message-preview">
                  Last message preview
                </p>
              </div>
              <span className="time text-muted small bg-white float-right">
                13:21
              </span>
            </div>
            <hr />

            <div className="conversation bg-white">
              <img
                className="profile-img rounded-circle img-fluid"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div className="conversation-user-text bg-white ">
                <h6 className="bg-white user-fullname">User fullname</h6>
                <p className="text-muted bg-white message-preview">
                  Last message preview
                </p>
              </div>
              <span className="time text-muted small bg-white float-right">
                13:21
              </span>
            </div>
            <hr />

            <div className="conversation bg-white">
              <img
                className="profile-img rounded-circle img-fluid"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div className="conversation-user-text bg-white ">
                <h6 className="bg-white user-fullname">User fullname</h6>
                <p className="text-muted bg-white message-preview">
                  Last message preview
                </p>
              </div>
              <span className="time text-muted small bg-white float-right">
                13:21
              </span>
            </div>
            <hr />
          </div>
        </div>

        <div className="col-8">
          <div className="upper-chat ">
            <img
              className="profile-img rounded-circle  "
              src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
              alt=""
            />
            <h6 className="user-fullname-upper-chat">User fullname</h6>
          </div>
          <div className="chat-panel  ">
            <Message own={false} />
            <Message own={true} />
          </div>

          <div className="lower-chat">
            <div className="send-message-box">
              <div className="input-group rounded input-message">
                <input
                  type="text"
                  className="form-control rounded border-0 shadow-none "
                  placeholder="Type something..."
                />
              </div>
              <SendIcon className="send-icon" />
            </div>
          </div>
        </div>
      </div>{" "}
      {/* row end*/}
      {/* This is where the chat begins
      <div className="row no-gutters">
        <div className="col-md-6"></div>
      </div>
      <div className="row no-gutters">
        <div className="col-md-2"></div>
      </div> */}
    </div>
  );

  // return (
  //   <div className="container py-5 px-4">
  //     {/* For demo purpose*/}
  //     <header className="text-center">
  //       <h1 className="display-4 text-white">Bootstrap Chat</h1>
  //       <p className="text-white lead mb-0">
  //         An elegant chat widget compatible with Bootstrap 4
  //       </p>
  //       <p className="text-white lead mb-4">
  //         Snippet by
  //         <a href="https://bootstrapious.com" className="text-white">
  //           <u>Bootstrapious</u>
  //         </a>
  //       </p>
  //     </header>
  //     <div className="row rounded-lg overflow-hidden shadow">
  //       {/* Users box*/}
  //       <div className="col-5 px-0">
  //         <div className="bg-white">
  //           <div className="bg-gray px-4 py-2 bg-light">
  //             <p className="h5 mb-0 py-1">Recent</p>
  //           </div>
  //           <div className="messages-box">
  //             <div className="list-group rounded-0">
  //               <a className="list-group-item list-group-item-action active text-white rounded-0">
  //                 <div className="media">
  //                   <img
  //                     src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //                     alt="user"
  //                     width={50}
  //                     className="rounded-circle"
  //                   />
  //                   <div className="media-body ml-4">
  //                     <div className="d-flex align-items-center justify-content-between mb-1">
  //                       <h6 className="mb-0">Jason Doe</h6>
  //                       <small className="small font-weight-bold">25 Dec</small>
  //                     </div>
  //                     <p className="font-italic mb-0 text-small">
  //                       Lorem ipsum dolor sit amet, consectetur adipisicing
  //                       elit, sed do eiusmod tempor incididunt ut labore.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </a>
  //               <a
  //                 href="#"
  //                 className="list-group-item list-group-item-action list-group-item-light rounded-0"
  //               >
  //                 <div className="media">
  //                   <img
  //                     src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //                     alt="user"
  //                     width={50}
  //                     className="rounded-circle"
  //                   />
  //                   <div className="media-body ml-4">
  //                     <div className="d-flex align-items-center justify-content-between mb-1">
  //                       <h6 className="mb-0">Jason Doe</h6>
  //                       <small className="small font-weight-bold">14 Dec</small>
  //                     </div>
  //                     <p className="font-italic text-muted mb-0 text-small">
  //                       Lorem ipsum dolor sit amet, consectetur. incididunt ut
  //                       labore.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </a>
  //               <a
  //                 href="#"
  //                 className="list-group-item list-group-item-action list-group-item-light rounded-0"
  //               >
  //                 <div className="media">
  //                   <img
  //                     src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //                     alt="user"
  //                     width={50}
  //                     className="rounded-circle"
  //                   />
  //                   <div className="media-body ml-4">
  //                     <div className="d-flex align-items-center justify-content-between mb-1">
  //                       <h6 className="mb-0">Jason Doe</h6>
  //                       <small className="small font-weight-bold">9 Nov</small>
  //                     </div>
  //                     <p className="font-italic text-muted mb-0 text-small">
  //                       consectetur adipisicing elit, sed do eiusmod tempor
  //                       incididunt ut labore.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </a>
  //               <a
  //                 href="#"
  //                 className="list-group-item list-group-item-action list-group-item-light rounded-0"
  //               >
  //                 <div className="media">
  //                   <img
  //                     src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //                     alt="user"
  //                     width={50}
  //                     className="rounded-circle"
  //                   />
  //                   <div className="media-body ml-4">
  //                     <div className="d-flex align-items-center justify-content-between mb-1">
  //                       <h6 className="mb-0">Jason Doe</h6>
  //                       <small className="small font-weight-bold">18 Oct</small>
  //                     </div>
  //                     <p className="font-italic text-muted mb-0 text-small">
  //                       Lorem ipsum dolor sit amet, consectetur adipisicing
  //                       elit, sed do eiusmod tempor incididunt ut labore.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </a>
  //               <a
  //                 href="#"
  //                 className="list-group-item list-group-item-action list-group-item-light rounded-0"
  //               >
  //                 <div className="media">
  //                   <img
  //                     src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //                     alt="user"
  //                     width={50}
  //                     className="rounded-circle"
  //                   />
  //                   <div className="media-body ml-4">
  //                     <div className="d-flex align-items-center justify-content-between mb-1">
  //                       <h6 className="mb-0">Jason Doe</h6>
  //                       <small className="small font-weight-bold">17 Oct</small>
  //                     </div>
  //                     <p className="font-italic text-muted mb-0 text-small">
  //                       consectetur adipisicing elit, sed do eiusmod tempor
  //                       incididunt ut labore.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </a>
  //               <a
  //                 href="#"
  //                 className="list-group-item list-group-item-action list-group-item-light rounded-0"
  //               >
  //                 <div className="media">
  //                   <img
  //                     src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //                     alt="user"
  //                     width={50}
  //                     className="rounded-circle"
  //                   />
  //                   <div className="media-body ml-4">
  //                     <div className="d-flex align-items-center justify-content-between mb-1">
  //                       <h6 className="mb-0">Jason Doe</h6>
  //                       <small className="small font-weight-bold">2 Sep</small>
  //                     </div>
  //                     <p className="font-italic text-muted mb-0 text-small">
  //                       Quis nostrud exercitation ullamco laboris nisi ut
  //                       aliquip ex ea commodo consequat.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </a>
  //               <a
  //                 href="#"
  //                 className="list-group-item list-group-item-action list-group-item-light rounded-0"
  //               >
  //                 <div className="media">
  //                   <img
  //                     src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //                     alt="user"
  //                     width={50}
  //                     className="rounded-circle"
  //                   />
  //                   <div className="media-body ml-4">
  //                     <div className="d-flex align-items-center justify-content-between mb-1">
  //                       <h6 className="mb-0">Jason Doe</h6>
  //                       <small className="small font-weight-bold">30 Aug</small>
  //                     </div>
  //                     <p className="font-italic text-muted mb-0 text-small">
  //                       Lorem ipsum dolor sit amet, consectetur adipisicing
  //                       elit, sed do eiusmod tempor incididunt ut labore.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </a>
  //               <a
  //                 href="#"
  //                 className="list-group-item list-group-item-action list-group-item-light rounded-0"
  //               >
  //                 <div className="media">
  //                   <img
  //                     src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //                     alt="user"
  //                     width={50}
  //                     className="rounded-circle"
  //                   />
  //                   <div className="media-body ml-4">
  //                     <div className="d-flex align-items-center justify-content-between mb-3">
  //                       <h6 className="mb-0">Jason Doe</h6>
  //                       <small className="small font-weight-bold">21 Aug</small>
  //                     </div>
  //                     <p className="font-italic text-muted mb-0 text-small">
  //                       Lorem ipsum dolor sit amet, consectetur adipisicing
  //                       elit, sed do eiusmod tempor incididunt ut labore.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       {/* Chat Box*/}
  //       <div className="col-7 px-0">
  //         <div className="px-4 py-5 chat-box bg-white">
  //           {/* Sender Message*/}
  //           <div className="media w-50 mb-3">
  //             <img
  //               src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //               alt="user"
  //               width={50}
  //               className="rounded-circle"
  //             />
  //             <div className="media-body ml-3">
  //               <div className="bg-light rounded py-2 px-3 mb-2">
  //                 <p className="text-small mb-0 text-muted">
  //                   Test which is a new approach all solutions
  //                 </p>
  //               </div>
  //               <p className="small text-muted">12:00 PM | Aug 13</p>
  //             </div>
  //           </div>
  //           {/* Reciever Message*/}
  //           <div className="media w-50 ml-auto mb-3">
  //             <div className="media-body">
  //               <div className="bg-primary rounded py-2 px-3 mb-2">
  //                 <p className="text-small mb-0 text-white">
  //                   Test which is a new approach to have all solutions
  //                 </p>
  //               </div>
  //               <p className="small text-muted">12:00 PM | Aug 13</p>
  //             </div>
  //           </div>
  //           {/* Sender Message*/}
  //           <div className="media w-50 mb-3">
  //             <img
  //               src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //               alt="user"
  //               width={50}
  //               className="rounded-circle"
  //             />
  //             <div className="media-body ml-3">
  //               <div className="bg-light rounded py-2 px-3 mb-2">
  //                 <p className="text-small mb-0 text-muted">
  //                   Test, which is a new approach to have
  //                 </p>
  //               </div>
  //               <p className="small text-muted">12:00 PM | Aug 13</p>
  //             </div>
  //           </div>
  //           {/* Reciever Message*/}
  //           <div className="media w-50 ml-auto mb-3">
  //             <div className="media-body">
  //               <div className="bg-primary rounded py-2 px-3 mb-2">
  //                 <p className="text-small mb-0 text-white">
  //                   Apollo University, Delhi, India Test
  //                 </p>
  //               </div>
  //               <p className="small text-muted">12:00 PM | Aug 13</p>
  //             </div>
  //           </div>
  //           {/* Sender Message*/}
  //           <div className="media w-50 mb-3">
  //             <img
  //               src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
  //               alt="user"
  //               width={50}
  //               className="rounded-circle"
  //             />
  //             <div className="media-body ml-3">
  //               <div className="bg-light rounded py-2 px-3 mb-2">
  //                 <p className="text-small mb-0 text-muted">
  //                   Test, which is a new approach
  //                 </p>
  //               </div>
  //               <p className="small text-muted">12:00 PM | Aug 13</p>
  //             </div>
  //           </div>
  //           {/* Reciever Message*/}
  //           <div className="media w-50 ml-auto mb-3">
  //             <div className="media-body">
  //               <div className="bg-primary rounded py-2 px-3 mb-2">
  //                 <p className="text-small mb-0 text-white">
  //                   Apollo University, Delhi, India Test
  //                 </p>
  //               </div>
  //               <p className="small text-muted">12:00 PM | Aug 13</p>
  //             </div>
  //           </div>
  //         </div>
  //         {/* Typing area */}
  //         <form action="#" className="bg-light">
  //           <div className="input-group">
  //             <input
  //               type="text"
  //               placeholder="Type a message"
  //               aria-describedby="button-addon2"
  //               className="form-control rounded-0 border-0 py-4 bg-light"
  //             />
  //             <div className="input-group-append">
  //               <button
  //                 id="button-addon2"
  //                 type="submit"
  //                 className="btn btn-link"
  //               >
  //                 {" "}
  //                 <i className="fa fa-paper-plane" />
  //               </button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
}
