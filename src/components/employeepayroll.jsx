import React, { useEffect, useRef, useState } from "react"
import { Calendar, Users, Mail, RotateCcw, Upload, History, } from 'lucide-react';
import dayjs from "dayjs";
import axios from "axios";
import "../AppStyles/emplyeepayroll.css"
import { Spinner } from "react-bootstrap";

const EmployeeDataScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [employeeData, setEmployeeData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [actionButton, setActionButton] = useState(false);
    const fileInputRef = useRef();
    // const [fileName, setFileName] = useState("");
    const [base64Files, setBase64Files] = useState(null);
    const [dataSpinner, setDataSpinner] = useState(false);

    useEffect(() => {
        if (actionButton) {
            handleFetch();
        }
    }, [])

    const handleFetch = async () => {

        setActionButton(true)
        if (!selectedDate) {
            alert('Please select a date first');
            return;
        }

        const formatKey = (key) =>
            key.trim().replace(/\s+/g, "_").replace(/[()]/g, "").toLowerCase();

        try {
          setDataSpinner(true)
            const response = await axios.get(
                `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/ReqCSC?business_date=${selectedDate}`
            );

            let rawData = response?.data;
            if (typeof rawData === "string") {
                rawData = rawData.replace(/\bNaN\b/g, "null");
                rawData = JSON.parse(rawData);
            }

            const cleanedData = rawData?.map((item, index) => {
                const newItem = { id: index + 1 };
                for (let key in item) {
                    const newKey = formatKey(key);
                    const value = item[key];
                    newItem[newKey] = value === null ? "" : value;
                }
                return newItem;
            });

            setEmployeeData(cleanedData);
            setShowData(true);
            setActionButton(false)

        } catch (error) {
            alert(error?.response?.data?.message)
            setShowData(false);
            console.log("error", error);
            setActionButton(flase)
        } finally {
          setDataSpinner(false)
        }
    }

    const handleClear = () => {
        setSelectedDate('');
        setEmployeeData([]);
        setShowData(false);
        setSelectedEmployees([]);
    };

    const handleSendEmail = async () => {
      if (selectedEmployees.length === 0) {
        alert("Please select employees to send email");
        return;
      }

      const selectedEmails = employeeData
        .filter((emp) => selectedEmployees?.includes(emp?.id))
        .map((emp) => emp?.email_id_reciepient);

      const payload = selectedEmails?.map((email) => ({
        email_id: email,
      }));

      try {
        setDataSpinner(true);
        const response = await axios.put(
          `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/ReqCSC`,
          payload
        );
        setSelectedEmployees([])
        alert(response?.data?.message)
      } catch (error) {
        console.error(error);
      } finally {
        setDataSpinner(false);
      }

      // alert(`Email would be sent to: ${selectedEmails}`);
    };

    const handleEmployeeSelect = (employeeId) => {
        setSelectedEmployees(prev => {
            if (prev.includes(employeeId)) {
                return prev.filter(id => id !== employeeId);
            } else {
                return [...prev, employeeId];
            }
        });
    };

    const selectAllEmployees = () => {
        if (selectedEmployees.length === employeeData.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employeeData.map(emp => emp.id));
        }
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>
                resolve({
                    name: file.name,
                    content: reader.result.split(",")[1],
                    type: file.type,
                });
            handleFileChange;
            reader.onerror = (error) => reject(error);
        });
    };


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        // setFileName(file ? file.name : "No file chosen");
        const files = Array.from(e.target.files);
        const base64Files = await Promise.all(files.map(fileToBase64));
        setBase64Files(base64Files);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        try {
            const payLoad = {
                document:
                {
                    content: base64Files[0]?.content,
                    filename: base64Files[0]?.name,
                },
            }
            const response = await axios.post(
                `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool//ReqCSC`, payLoad);

            if (response?.status === 200) {
                alert(response?.data?.message)
            } else {
                alert(response?.data?.message)
            }
        } catch (error) {
            console.log("error", error);

        }
    };

    return (
        <div className="main-content-container">
            <div className="mt-2 caret-transparent p-3 rounded-2xl" id="demo-screen-container">
              
              {dataSpinner && <div className="absolute z-10 top-[50%] left-[50%]">
              <Spinner animation="border" variant="primary" />
              </div>}

                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">

                       <div className="flex justify-between">
                            <h1 className="!text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Users className="h-6 w-6 text-blue-600" />
                                Singapore Payroll - Client Details
                            </h1>

                            <button
                                className="px-4 py-2 bg-gray text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-1 h-[30px]"
                            >
                                <History className="h-4 w-4" />
                                History
                            </button>
                        </div> 

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-gray-500" />
                                    <label htmlFor="date" className="text-sm font-medium text-gray-700">
                                        Select Date:
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleFetch}
                                        className="bg-blue-600 text-white px-2 !rounded-[6px] text-[12px] h-[30px]"
                                    >
                                        Fetch Data
                                    </button>

                                    <button
                                        onClick={handleClear}
                                        className="bg-stone-400 text-white px-2 !rounded-[6px] text-[12px] h-[30px] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-1"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        Clear
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleSendEmail}
                                    disabled={selectedEmployees.length === 0}
                                    className="bg-green-600 text-white px-2 !rounded-[6px] text-[12px] h-[30px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    <Mail className="h-4 w-4" />
                                    Send Email
                                </button>

                                <div className="file-upload">
                                    <input
                                        type="file"
                                        id="fileUpload"
                                        name="fileUpload"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="bg-purple-600 text-white px-2 !rounded-[6px] text-[12px] h-[30px] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Upload File
                                    </button>
                                </div>
                            </div>
                        </div>

                        {selectedDate && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-md">
                                <p className="text-sm text-blue-800">
                                    <strong>Selected Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {showData && (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Client Notification(s) Data ({employeeData.length} records)
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="selectAll"
                                            checked={selectedEmployees?.length === employeeData?.length && employeeData?.length > 0}
                                            onChange={selectAllEmployees}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="selectAll" className="text-sm text-gray-700">
                                            Select All
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto flex items-center">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Select
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                SG Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Client Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[325px]">
                                                Email ID (RECIPIENT)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email CC
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Business Day
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Month
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {employeeData?.map((employee) => (
                                            <tr
                                                key={employee?.id}
                                                className={`hover:bg-gray-50 ${selectedEmployees.includes(employee?.id) ? 'bg-blue-50' : ''}`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedEmployees?.includes(employee?.id)}
                                                        onChange={() => handleEmployeeSelect(employee?.id)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {employee?.sg_code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {employee?.client_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {employee?.email_id_reciepient}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {employee?.email_cc}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                                                    {employee?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {employee?.business_day ? dayjs(employee?.business_day).format("DD-MMM-YYYY") : "N/A"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {employee?.month}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {selectedEmployees.length > 0 && (
                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                                    <p className="text-sm text-gray-700">
                                        <strong>{selectedEmployees.length}</strong> employee(s) selected for email
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {!showData && !dataSpinner && (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center mt-5">
                            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data to Display</h3>
                            <p className="text-gray-500">Select a date and click "Fetch Data" to display employee information.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default EmployeeDataScreen;