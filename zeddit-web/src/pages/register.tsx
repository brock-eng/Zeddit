import React from 'react';
import {Formik, Form} from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface registerProps {

}




export const Register: React.FC<registerProps> = ({}) => {
        return (
            <Wrapper variant ="small">
                <Formik 
                    initialValues={{username: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}>
                    {({values, handleChange, isSubmitting}) => (
                        <Form>
                            <InputField
                                name ="Username"
                                placeholder ="username"
                                label ="Username"
                            />
                            <Box mt={4}>
                                <InputField
                                    type="password"
                                    name ="Password"
                                    placeholder='password'
                                    label ="Password"
                                />
                            </Box>
                            <Button 
                                mt={4} 
                                type="submit"
                                isLoading={isSubmitting}
                                color ="white"
                                backgroundColor="teal"
                            >
                                Register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
};


export default Register;