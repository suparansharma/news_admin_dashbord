import { useEffect, useState, useCallback } from 'react';
import HeadSection from "../../../../components/HeadSection";
import Button from "../../../../components/elements/Button";
import Form from "../../../../components/elements/Form";
import Label from "../../../../components/elements/Label";
import RadioButton from "../../../../components/elements/RadioButton";
import Select from "../../../../components/elements/Select";
import Select2 from "../../../../components/elements/Select2";
import TextInput from "../../../../components/elements/TextInput";
import ToastMessage from '../../../../components/Toast';
import { useRouter } from "next/router";
import { USER_END_POINT } from "../../../../constants/api_endpoints/userEndPoints";
import { get, post } from '../../../../helpers/api_helper';
import axios from 'axios';
// 
const Users = () => {

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email:"",
    password:"",
    role:null,
    status: "" || "true",
  });

  const [allClassesList, setAllClassesList] = useState([]);



  const handleChange = (e) => {
    setUserDetails(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }



  async function submitForm(e) {
    e.preventDefault();
    const body = { ...userDetails};
    const response = await post(USER_END_POINT.create(), body);
  }

  return (
    <>
      <HeadSection title="Add Categorie" />
      <div className="container-fluid ">
        <div className="w-75 m-auto">
          <div className="row">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body border-bottom">
                  <h4 className="card-title">Add User</h4>
                </div>
                <Form onSubmit={submitForm} >
                  <div className="card-body">
                    <TextInput name="name" label="Name" placeholder="Enter the name"   onChange={handleChange}/>
                    <TextInput name="email" label="Email" placeholder="Enter the email"   onChange={handleChange}/>
                    <TextInput name="password" label="Password" placeholder="Enter the Password"   onChange={handleChange}/>

                    <div className="mb-3 row">
                      <Label text="User Type" />
                      <div className="col-sm-6">
                        <Select name="role" onChange={handleChange}  >
                          <option value="2" selected>Manager</option>
                          <option value="3">Employee</option>
                          <option value="4">General</option>
                        </Select>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <Label text="Status" />
                      <div className="col-sm-6">
                        <Select name="status" onChange={handleChange}  >
                          <option value="true" selected>Active</option>
                          <option value="false">Inactive</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-top">
                    <div className="text-end">
                      <Button className="btn-info">
                        Save
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Users