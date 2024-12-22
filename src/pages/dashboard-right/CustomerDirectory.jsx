import { useState, useEffect } from "react";
import { RxAvatar } from "react-icons/rx";
import { FaBell } from "react-icons/fa";
import Pagination from "../../UI/Pagination";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action";
import PopupModal from "../../UI/PopupModal";
import Loader from "../../UI/Loader";
const api = require("../../api/index");
function CustomerDirectory(props) {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const dispatch = useDispatch();
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  useEffect(() => {
    onPageChange(pageNumber);
  }, []);

  const onPageChange = (pageNumber) => {
    setPageNumber(pageNumber);
    api
      .fetchCustomerDetailsForDashboard(limit, pageNumber)
      .then((response) => {
        setCustomerDetails(response.data.data);
        setTotalPage(response.data.totalRecords / limit);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          dispatch(logout());
        }
      });
  };
  const sendDueNotifaction = (email, due, name) => {
    const body = {
      to: email,
      subject: "Janta Store due mailer",
      templateName: "due",
      model: {
        name: name,
        dueAmount: due,
      },
    };
    setIsLoading(true);
    api
      .sendMail("due-notifcation", body)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setErrorMessage("Mail sent successFully");
        openModal();
      })
      .catch((err) => {
        console.log(err);
        closeModal();
      });
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Customer Directory</h2>
      <hr />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
          {customerDetails.map((customer) => {
            const date = new Date(customer.lastBilledDate);
            return (
              <div
                key={customer.id}
                className="bg-blue-50 text-[#343A40] p-4 shadow rounded-xl font-mono max-w-50 text-ellipsis"
              >
                <RxAvatar className="text-6xl text-[#007BFF]" />
                <h2 className="font-bold text-[#8E44AD]">
                  {customer.customerName}
                </h2>
                <p className="text-sm ">
                  <strong>Contact no. : </strong>+91-{" "}
                  <a href="tel">{customer.phoneNumber}</a>
                </p>
                <p className="text-sm text-red-500">
                  <strong>Due: </strong>₹ {customer.dueAmount}
                </p>
                <p className="text-sm">
                  <strong>Address: </strong> {customer.address.toLowerCase()}
                </p>
                <p className="text-sm">
                  <strong>Last Billed Date: </strong>
                  {customer.lastBilledDate
                    ? formatter.format(date)
                    : "--:--:--"}
                </p>
                <p className="text-sm">
                  <strong>Total bills: </strong>
                  {customer.bills}
                </p>
                <FaBell
                  className="text-2xl cursor-pointer pt-2"
                  onClick={(e) =>
                    sendDueNotifaction(
                      customer.email,
                      customer.dueAmount,
                      customer.customerName
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      )}
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPage}
        onPageChange={onPageChange}
      />
      {isOpen && (
        <PopupModal
          isOpen={isOpen}
          onClose={closeModal}
          title="Success"
          message={errorMessage}
          type="success"
        />
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default CustomerDirectory;
