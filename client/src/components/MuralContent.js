import React, { useState } from "react";
import {
  Row,
  Col,
  Image
 } from 'react-bootstrap';
import { Button, Checkbox } from 'semantic-ui-react';
import MuralUserContent from "./MuralUserContent";
import { Frame, Page,  } from "framer"

export default function MuralContent(props) {

    const [pageInd, setPageInd] = useState(true);

    const setMNav = props.setDesktopMNav;
    setMNav(true);


    return (
        <Row className="pt-2">
            <Col className="scrollButtMural">
                <Row>
                    <Col className="pb-2">
                        <Button content='Back' color="gray"/>
                    </Col>
                    <Col className="text-right pb-2">
                        <Button content='Post Photo' color="yellow"/>
                    </Col>
                </Row>
                <Row className="sideImgBox">
                    <Col className="p-0">
                        <Image className="img-fluid w-100" src="https://doc-0k-64-mymaps.googleusercontent.com/untrusted/hostedimage/eu6g64mterdev2kl51im39lbvg/f4nabjcl8v0egsiv4ullr9joh4/1601130498500/YG7sw_Ardp6TjVMKCDnPrtHYy_GrqAdf/10485590891576421370/5AF2TALqMMHmxczgGZTXbnmaaI67mpGtBpNh083O7OMBQYZd3rh15H4vXgsHpKFrQ16N15NR5tr61Ndz-YM6rKJWN8F7npV5kS5eaYMnwPM8GNvApwn_Xw3hU_sFuxMsH-WkxIhv4Iw78ECVZ92pd9WUYTGU7fKcIG-iwsdonh65hAHNcbJ9FKQxI20bz-rNDiwNiYNXQnJhTokokhIs-Nm889i3_9qrwHAh5Xo2XlozR9JsV3NVrZHKH4aOqjZL7WVEe6I0D8Gm3uab0d9HBtZlMH58nROQ7Iw?session=0&fife"/>
                        {/* <Image className="img-fluid w-100 inner" src={props.image}/> */}
                    </Col>
                </Row>
                <Row className="mb-4 pt-1">
                    <Col xs={2} className="my-auto">
                        <Checkbox label='VISITED' />
                    </Col>
                    <Col xs={5} className="text-right">
                        <Button
                        size='mini'
                        color='yellow'
                        content='Distance'
                        icon='location arrow'
                        label={{ basic: true, color: 'yellow', pointing: 'left', content: '2,048' }}
                        />
                    </Col>
                    <Col xs={5} className="text-right">
                        <Button
                            size='mini'
                            color='gray'
                            content='Visits'
                            icon='street view'
                            label={{
                                as: 'a',
                                basic: true,
                                color: 'gray',
                                pointing: 'left',
                                content: '2,048',
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>ARTIST: {props.artistinfo}Lord Rasputin</p>
                        <p>TITLE: {props.arttitle}The Devil's Cherry Ass</p>
                        <p>LOCATION: {props.arttitle}In The Devil's Cherry Ass</p>
                        {/* <p>This is a story of a man named Jed. Poor mountaineer hardly kept his family fed. Jelly halvah croissant.</p> */}
                    </Col>
                </Row>
                <Row className="h-100 w-100 mx-0">
                    <Col className="p-0">
                        <Row className="pt-2">
                            <Col className="pr-1 text-right">
                                {pageInd? 
                                    <Button size="mini" color="yellow" compact floated="right"/> : 
                                    <Button size="mini" color="yellow" compact floated="right" disabled/>
                                    }
                            </Col>
                            <Col className="pl-1 text-left">
                                {pageInd? 
                                    <Button size="mini" color="yellow" compact floated="left" disabled/> : 
                                    <Button size="mini" color="yellow" compact floated="left"/>
                                    }                        
                            </Col>
                        </Row>
                        <Page width={"100%"} height={"100%"}
                        onChangePage={(current) => 
                            {current===0?setPageInd(true) : setPageInd(false)}
                        }
                        >
                            <Frame backgroundColor="#FFFFFF">
                                <MuralUserContent />
                            </Frame>
                            <Frame backgroundColor="#FFFFFF">
                                <MuralUserContent />
                            </Frame>
                        </Page>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
