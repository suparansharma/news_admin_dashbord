import React ,{ useEffect, useState, useCallback } from 'react'
import { useRouter } from "next/router";
import { get, post, put } from '../../../../../helpers/api_helper';
import { USER_END_POINT } from "../../../../../constants/api_endpoints/userEndPoints";
import HeadSection from "../../../../../components/HeadSection";
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import Select from "../../../../../components/elements/Select";
import TextInput from "../../../../../components/elements/TextInput";
import ToastMessage from '../../../../../components/Toast';
const UpdateUser = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
      }, []);
    const router = useRouter();
    const { id } = router?.query;
    const [userDetails, setUserDetails] = useState({});
console.log(userDetails);
    const fetchUser = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
          const getTheCategory = await get(USER_END_POINT.info(id));
          setUserDetails(prev => ({
            ...prev,
            name: getTheCategory?.name,
            email: getTheCategory?.email,
            password: getTheCategory?.password,
            role: getTheCategory?.role,
            status: getTheCategory?.status,
          }));
        }
    
        // setLoading(true);
        return () => (isSubscribed = false);
      }, [id]);

      useEffect(() => {
        fetchUser();
      }, [fetchUser]);

      const handleChange = (e) => {
        setUserDetails(prev => ({
          ...prev, [e.target.name]: e.target.value
        }))
      }


      async function submitForm(e) {
        e.preventDefault();
     
        const updateTheClass = await put(USER_END_POINT.update(id), userDetails);
        if (updateTheClass.modifiedCount > 0) {
          notify("success", "Successfully updated");
          router.push(`/modules/hr/users`);
        }
    
        else {
          notify("error", "some thing went wrong");
        }
    
      }

  return (
    <>
    <HeadSection title="Update User" />
    <div className="container-fluid ">
      <div className="w-75 m-auto">
        <div className="row">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Update User</h4>
              </div>
              <Form onSubmit={submitForm} >
                <div className="card-body">
                  <TextInput name="name" label="Name" placeholder="Enter the name" value={userDetails.name}   onChange={handleChange}/>
                  <TextInput name="email" label="Email" placeholder="Enter the email" value={userDetails.email}   onChange={handleChange}/>
                  <TextInput name="password" label="Password" placeholder="Enter the Password"  value={userDetails.password}  onChange={handleChange}/>

                  <div className="mb-3 row">
                    <Label text="User Type" />
                    <div className="col-sm-6">
                      <Select name="role" value={userDetails.role} onChange={handleChange}  >
                        <option value="2" selected>Manager</option>
                        <option value="3">Employee</option>
                        <option value="4">General</option>
                      </Select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <Label text="Status" />
                    <div className="col-sm-6">
                      <Select name="status" value={userDetails.status} onChange={handleChange}  >
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

export default UpdateUser