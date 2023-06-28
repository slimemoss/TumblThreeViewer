import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import parse from 'html-react-parser'
import { Answer, useAnswer } from './AnswerHooks';
import { Button } from 'react-bootstrap';


type FormData = {
  file: FileList
}

export const Page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const {answer, setAnswer} = useAnswer()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const file = data.file[0];
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      setAnswer(content)
    };
    reader.readAsText(file);
  };

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        {...register('file', { required: true })}
      />
      <button type="submit">送信</button>
    </form>

    <Filtered data={answer} />
  </>
}

const Filtered = (props: {data: Answer[]}) => {
  const [data, setData] = useState(props.data)
  const [word, setWord] = useState('')

  React.useEffect(() => {
    if(word == '') {
      setData(props.data)
    }

    setData(
      props.data.filter((d) => 
        d.answer.includes(word) || d.question.includes(word)
      )
    )
    console.log(word)
    console.log(data)
  }, [word, props.data])

  return <>
    <input value={word} onChange={(e) => {setWord(e.target.value)}} />
    <PagenateItems data={data} />
  </>
  
}

const Items = (props: {data: Answer[]}) => {
  const {data} = {...props}
  return <>
    {data.map((a, i) => (
      <div key={i}>
        <div>
          {parse(a.question)}
        </div>
        <div>
          {parse(a.answer)}
        </div>
        <hr/>
      </div>
    ))
    }
  </>
}

const PagenateItems = (props: {data: Answer[]}) => {
  const {data} = {...props}

  const ItemPerPage = 30
  const [page, setPage] = React.useState(0)

  return <>
    <Items data={data.slice(ItemPerPage * page, ItemPerPage * (page + 1))}/>

    <div>
      <Button onClick={() => {setPage(page - 1)} }>p</Button>
      {page + '/' + data.length / ItemPerPage}
      <Button onClick={() => {setPage(page + 1)} }>n</Button>
    </div>
  </>
}
