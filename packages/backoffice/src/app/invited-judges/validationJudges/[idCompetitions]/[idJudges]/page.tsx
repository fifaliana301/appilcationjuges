"use client";
import React from 'react';
import styles from './page.module.css';
import { withSwal } from 'react-sweetalert2';
import withAuth from '@/components/withAuth';
import { useParams } from 'next/navigation';
import { fetchValidationJudges } from '@/libs/utils/invitedJudges';
import Link from 'next/link';

const InvitedJudges = withSwal(({ swal }: any) => {
  const [validate, setValidate] = React.useState(false);
  const [data, setData] = React.useState<any>(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const params = useParams<any>();

  // Fonction pour valider le juge
  const validateJudge = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetchValidationJudges(params, config);
      console.log(response);
      setData(response);
      setValidate(true);
      setErrorMessage("");
    } catch (error: any) {
      console.error(error);
      setValidate(false);
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Appeler la validation au montage du composant
  React.useEffect(() => {
    validateJudge();
  }, []);

  return (
    <main className={styles.main}>
      {loading ? (
        <div className={styles.container}>
          <p className={styles.p}>Validating judge, please wait...</p>
        </div>
      ) : validate ? (
        <div className={styles.container}>
          <div className={styles.icon}>✔️</div>
          <h1 className={styles.h1}>Validation Successful!</h1>
          <p className={styles.p}>The judge has been successfully validated for the battles.</p>
          <div className={styles.info}>
            <p className={styles.p}>
              <strong>Competition:</strong> {data?.competitions?.name}
            </p>
            <p className={styles.p}>
              <strong>Judge:</strong> {data?.judges?.login}
            </p>
          </div>
          <Link href="/" className={styles.button}>
            Return to Dashboard
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.icon}>❌</div>
          <h1 className={styles.h1_error}>Validation Failed!</h1>
          <p className={styles.p}>An error occurred while validating the judge for the battles.</p>

          <div className={styles.info}>
            <p className={styles.p}>
              <strong>Error:</strong> {errorMessage}
            </p>
          </div>
          <Link href="/" className={styles.button}>
            Return to Dashboard
          </Link>
        </div>
      )}
    </main>
  );
});

export default withAuth(InvitedJudges);
