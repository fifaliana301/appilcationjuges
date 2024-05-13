'use client';
import React from 'react';
import styles from './validation.module.css'

import { Button, Label, TextInput } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { validateAdminActiveFetch } from '@/libs/reducers';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation'
import { resetError } from '@/libs/reducers/slices';


function Page() {
  const params = useParams<any>()
  console.log(params);

  const judgesStatus = useSelector((state: any) => state.judges?.judgesStatus)
  const adminActive = useSelector((state: any) => state.judges?.adminActive)

  const router = useRouter();

  const [validate, setValidate] = React.useState("");

  const dispatch = useDispatch();

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(validateAdminActiveFetch({ validate, idUser: params.id }));
  }

  const firstUpdateReward = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateReward.current) {
      firstUpdateReward.current = false;
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    console.log({ accessToken, judgesStatus, adminActive })
    if (judgesStatus === 'success' && accessToken) {
      dispatch(resetError())
      if (adminActive?.admins) {
        router.push(`/competitions_admin`)
      } else {
        router.push(`/competitions`)
      }
    }
  }, [judgesStatus])


  return (
    <div className={styles.main}>
      <form className={`login ${styles.form} flex max-w-screen-lg flex-col gap-4`} onSubmit={onSubmit}>
        <div>
          <h1 className={styles.title}>Validate Email</h1>
          <p>
            Email was sent to:
          </p>
          <p>
            Please enter the validation code below or folow the link in the email that was sent to you
          </p>
          <p>
            If you have not received this email please check your spam folder
          </p>
          <div className="mb-2 mt-3 block">
            <Label htmlFor="validate" value="Validation code" />
          </div>
          <TextInput
            id="validate"
            type="number"
            required
            sizing="lg"
            value={validate}
            onChange={(e: any) => {
              const { value, maxLength } = e.target;
              const message = value.slice(0, maxLength);
              setValidate(message)
            }}
            maxLength={6}
            style={{
              width: 100,
              fontSize: 16
            }}
          />
        </div>
        <Button
          type="submit"
          className="mt-3"
          isProcessing={judgesStatus === "pending"}
          disabled={judgesStatus === "pending"}
          size="xl"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Page;
