import React, { useEffect, useRef } from "react";
import axios from "axios";
import { ConversationalForm } from "conversational-form";
import { fakeQuestion } from "./question";

export default function MyForm() {
  let cf = null;
  const ref = useRef(null);

  const formFields = fakeQuestion?.map(
    ({ STT, IDQues, NameQues, IDAns, NameAns }) => ({
      tag: "input",
      type: "radio",
      name: IDQues,
      "cf-questions": NameQues,
      "cf-label": NameAns,
      value: IDAns,
    })
  );

  useEffect(function mount() {
    cf = ConversationalForm.startTheConversation({
      options: {
        theme: "black",
        submitCallback: submitCallback,
        // loadExternalStyleSheet: false
        robotImage: "d",
      },
      tags: formFields,
    });

    ref.current.appendChild(cf.el);

    return function unMount() {
      cf.remove();
    };
  }, []);

  function submitCallback() {
    var formDataSerialized = cf.getFormData(true);

    axios.get("https://blog.trongggg.com/wp-json/wp/v2/posts", {}).then(function (response) {
      console.log(response.data);
    });

    // axios
    //   .post("https://eniw3jw5fiudl2o.m.pipedream.net", {
    //     ...formDataSerialized,
    //   })
    //   .then(function (response) {
    //     console.log("response", response);
    //   });

    // console.log("Formdata, obj:", formDataSerialized);

    // cf.addRobotChatResponse(
    //   "You are done. Check the dev console for form data output."
    // );
  }

  return (
    <div>
      <div ref={ref} />
    </div>
  );
}
