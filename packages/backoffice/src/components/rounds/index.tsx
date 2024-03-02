import React, { useRef } from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import swap from 'lodash-move'
import ModalCompetition from '@/components/modalCompetition/modalCompetition';
import { initRoundsFetch, updateRoundsUpdateAll } from '@/libs/reducers/actions/rounds.action'

import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setRounds } from '@/libs/reducers/slices/rounds.slice'

const fn = (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) => (index: number) => {
  return active && index === originalIndex
    ? {
      y: curIndex * 50 + y,
      scale: 1.1,
      zIndex: 1,
      shadow: 15,
      immediate: (key: string) => key === 'y' || key === 'zIndex',
    }
    : {
      y: order.indexOf(index) * 50,
      scale: 1,
      zIndex: 0,
      shadow: 1,
      immediate: false,
    }
}

function Block({
  i,
  zIndex,
  shadow,
  y,
  scale,
  bind,
  item,
  deleteItem,
  idEdit,
  setIdEdit,
  saveEdit,
}: any) {
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    setName(item.name)
  }, [item])

  return (
    <animated.div
      style={{
        zIndex,
        boxShadow: shadow.to((s: any) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
        y,
        scale,
      }}
    >
      {idEdit === item.id ?
        <>
          <div
            style={{ flex: 1 }}
          >
            <input
              placeholder="Round name "
              className={styles.input}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div
              className={styles.button_icon}
              onClick={() => {
                console.log("save")
                saveEdit({
                  ...item,
                  name: name
                })
                setName("")
              }}
            >
              <i className={`fas fa-save`}></i>
            </div>
            <div
              className={styles.button_icon}
              onClick={() => {
                console.log("cancel")
                setName(item.name)
                setIdEdit(null)
              }}
            >
              <i className={`fas fa-times`}></i>
            </div>
          </div>
        </>
        :
        <>
          <div
            {...bind(i)}
            style={{
              flex: 1,
              marginRight: 12,
            }}
          >
            {item.name}
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div
              className={styles.button_icon}
              onClick={() => {
                console.log("edit")
                setIdEdit(item.id)
              }}
            >
              <i className={`fas fa-edit`}></i>
            </div>
            <div
              className={styles.button_icon}
              onClick={() => {
                console.log("delete: " + item.id)
                deleteItem(item.id)
              }}
            >
              <i className={`fas fa-trash`}></i>
            </div>
          </div>
        </>
      }
    </animated.div>
  )
}


function BlockNew({
  marginTop,
  newItem,
}: any) {
  const [name, setName] = React.useState("");

  return (
    <animated.div
      key={"new"}
      style={{
        zIndex: 10000,
        y: marginTop,
      }}
    >
      <div
        style={{ flex: 1 }}
      >
        <input
          placeholder="Round name "
          className={styles.input}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div
          className={styles.button_icon}
          onClick={() => {
            console.log("save")
            newItem(name)
            setName("")
          }}
        >
          <i className={`fas fa-save`}></i>
        </div>
        <div
          className={styles.button_icon}
          onClick={() => { console.log("cancel") }}
        >
          <i className={`fas fa-times`}></i>
        </div>
      </div>
    </animated.div>
  )
}

function DraggableList({ items, newItem, deleteItem, order, setIdEdit, idEdit, saveEdit }: any) {
  const [springs, api] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    api.start(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) order.current = newOrder
  })

  React.useEffect(() => {
    order.current = items.map((_, index) => index);
    api.start(fn(order.current))
  }, [items])

  return (
    <div className={styles.content} style={{ height: ((items.length + 1) * 50) - (idEdit ? 50 : 0) }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <Block
          item={items[i]}
          key={i}
          {...{
            i,
            zIndex,
            shadow,
            y,
            scale,
            bind,
            deleteItem,
            setIdEdit,
            idEdit,
            saveEdit
          }}
        />
      ))}
      {!idEdit &&
        <BlockNew
          marginTop={(items.length) * 50}
          newItem={newItem}
        />}
    </div>
  )
}

function Rounds({ openModal, setOpenModal, idRound }: any) {
  const dispatch = useDispatch()
  const roundsStatus = useSelector((state: any) => state.rounds?.roundsStatus)
  const items = useSelector((state: any) => state.rounds?.datas)
  const [idEdit, setIdEdit] = React.useState();

  const setItems = (item: any) => {
    dispatch(setRounds(item))
  }

  React.useEffect(() => {
    if (idRound) {
      dispatch(initRoundsFetch({ id: idRound }))
    }
  }, [idRound])

  const [itemDelete, setItemDelete] = React.useState([])

  const order = useRef(items.map((_, index: number) => index)) // Store indicies as a local ref, this represents the item order

  const newItem = (name: string) => {
    setItems([
      ...items,
      {
        id: Date.now() + "",
        name,
        start_time: "2023-11-06T12:34:01.058Z",
        end_time: "2023-11-06T12:34:01.058Z",
        order: items.length,
        new: true,
      },
    ])
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item: any) => {
      if (item.id === id) {
        if (!item.new) {
          setItemDelete([...itemDelete, item])
        }
        return false
      }
      return true
    }))
  }

  const saveEdit = (new_item: any) => {
    setItems(items.map((item: any) => {
      if (item.id === new_item.id) {
        return new_item
      }
      return item;
    }))
    setIdEdit(null);
  }

  const firstUpdateReward = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateReward.current) {
      firstUpdateReward.current = false;
      return;
    }
    console.log("roundsStatus: ", roundsStatus)
    if (roundsStatus === 'success') {
      setOpenModal(false)
    }
  }, [roundsStatus])

  return (
    <ModalCompetition
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Rounds"
      accept="Save"
      cancel="Cancel"
      onAccept={() => {
        const newItem = items;
        const newOrPut = order.current?.map((od: any, index: number) => {
          return {
            ...newItem[od],
            order: index,
            calendarsBattles: {
              id: idRound
            }
          }
        })

        dispatch(updateRoundsUpdateAll({
          id: idRound,
          delete: itemDelete,
          newOrPut: newOrPut
        }))
      }}
      onCancel={() => { }}
      onClose={() => { }}
    >
      <div className={styles.container}>
        <DraggableList {...{ items, newItem, deleteItem, order, setIdEdit, idEdit, saveEdit }} />
      </div>
    </ModalCompetition>
  )
}



export default Rounds
