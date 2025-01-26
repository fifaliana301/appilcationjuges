"use client"
import styles from './cardBattle.module.css'
import Image from 'next/image'
import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import config from '@/config';

export const CardBattle = (props: any) => {
  return (
    <div className={styles.container}>

      {
        props.isAdmin &&
        <div className="d-flex justify-content-end align-items-center">
          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() =>
              <span style={{ width: 18, height: 18, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', right: -14, top: -4 }}>
                <i className="fa-solid fa-ellipsis-vertical fa-lg"></i>
              </span>
            }
            placement="right-start"
            className="flowbite-dropdown"
          >
            <Dropdown.Item><i className="fas fa-edit mr-1"></i> Edit</Dropdown.Item>
            <Dropdown.Item><i className="fas fa-trash mr-1"></i> Delete</Dropdown.Item>
            <Dropdown.Item onClick={() => props.setIdRound(props.data.id)}><i className="fa-solid fa-circle-notch mr-1"></i> Rounds</Dropdown.Item>
            <Dropdown.Item>

              <Link href={`/rulling/${props.data?.id}`} legacyBehavior>
                <a target="_blank">
                  <i className="fas fa-edit mr-1"></i> Rulling
                </a>
              </Link>
            </Dropdown.Item>
          </Dropdown>
        </div>
      }
      <div className="d-flex justify-content-between align-items-center">
        <Image
          src={
            props.data?.competitors?.[0]?.photos?.length ?
              `${config.API_HOST}/${props.data?.competitors[0]?.photos[props.data?.competitors[0].photos?.length - 1].name}` :
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU"
          }
          width={38}
          height={38}
          alt="Picture of the author"
          className={styles.image}
        />
        50% vs 50%
        <Image
          src={
            props.data?.competitors?.[1]?.photos?.length ?
              `${config.API_HOST}/${props.data?.competitors[1]?.photos[props.data?.competitors[1].photos?.length - 1].name}` :
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU"
          }
          width={38}
          height={38}
          alt="Picture of the author"
          className={styles.image}
        />
      </div>
      <div className="mt-1">
        {props.data?.description || ""}
      </div>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <div className="text-bold">
          {new Date(props.data?.dates)?.toDateString()}
        </div>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            width: ([0, 1].length * 24) - (8 * ([0, 1].length - 1)),
          }}>
          {
            props.data?.judges?.map((judge: any, i: number) => {

              const src = (judge.photos.length && `${config.API_HOST}/${judge.photos[judge.photos.length - 1].name}`)
                || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU";
              return <Image
                key={i}
                src={src}
                width={24}
                height={24}
                alt="Picture of the author"
                style={{
                  borderRadius: '50%',
                  position: 'relative',
                  transform: `translateX(-${i * 8}px)`,
                  border: '1px solid #22272C99'
                }}
              />
            })
          }
        </div>
      </div>
    </div>
  )
}
