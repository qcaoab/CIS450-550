import React from 'react';
import faker from 'faker/locale/en_US';

import { 
    Nav, 
    Link,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    CustomInput,
    Badge
} from './../../../components';

const SearchResultsLeftNav = () => (
    <React.Fragment>
        { /* START Category */}
        <Nav vertical className="mb-3">
            <div>
                <Link href="#" className="small d-flex px-1">
                    <span>
                        Genre
                    </span>
                    <i className="fa fa-angle-down align-self-center ml-auto"></i>
                </Link>
            </div>
            <div>
                <Link href="#" className="d-flex">
                    <span>
                        { faker.commerce.department() }
                    </span>
                    <span className="small ml-auto align-self-center text-body">
                        ({ faker.finance.mask() })
                    </span>
                </Link>
            </div>
            <div>
                <Link href="#" className="d-flex">
                    <span>
                        { faker.commerce.department() }
                    </span>
                    <span className="small ml-auto align-self-center text-body">
                        ({ faker.finance.mask() })
                    </span>
                </Link>
            </div>
            <div>
                <Link href="#" className="d-flex">
                    <span>
                        { faker.commerce.department() }
                    </span>
                    <span className="small ml-auto align-self-center text-body">
                        ({ faker.finance.mask() })
                    </span>
                </Link>
            </div>
        </Nav>
        { /* END Category */}
        { /* START Rating */}
        <Nav vertical className="mb-3">
            <div className="mb-2">
                <Link href="#" className="small d-flex px-1">
                    <span>
                        Rating
                    </span>
                    <i className="fa fa-angle-down align-self-center ml-auto"></i>
                </Link>
            </div>
            <div className="d-flex px-2 mb-2">
                <CustomInput type="radio" id="radio1" name="rating" label="Clothing" inline defaultChecked />
                <span className="small ml-auto align-self-center">
                    ({ faker.finance.mask() })
                </span>
            </div>
            <div className="d-flex px-2 mb-2">
                <CustomInput type="radio" id="radio2" name="rating" label="Baby" inline />
                <span className="small ml-auto align-self-center">
                    ({ faker.finance.mask() })
                </span>
            </div>
            <div className="d-flex px-2 mb-2">
                <CustomInput type="radio" id="radio3" name="rating" label="Jewelery" inline />
                <span className="small ml-auto align-self-center">
                    ({ faker.finance.mask() })
                </span>
            </div>
            <div className="d-flex px-2 mb-2">
                <CustomInput type="radio" id="radio4" name="rating" label="Games" inline />
                <span className="small ml-auto align-self-center">
                    ({ faker.finance.mask() })
                </span>
            </div>
        </Nav>
        { /* END Rating */}
        { /* START Tags */}
        <Nav vertical className="mb-3">
            <div className="mb-2">
                <Link href="#" className="small d-flex px-1">
                    <span>
                        Tags
                    </span>
                    <i className="fa fa-angle-down align-self-center ml-auto"></i>
                </Link>
            </div>
            <div className="d-flex px-2 mb-2">
                <CustomInput type="checkbox" id="checkbox1" label="Garden" inline defaultChecked />
                <span className="small ml-auto align-self-center">
                    ({ faker.finance.mask() })
                </span>
            </div>
            <div className="d-flex px-2 mb-2">
                <CustomInput type="checkbox" id="checkbox2" label="Beauty" inline />
                <span className="small ml-auto align-self-center">
                    ({ faker.finance.mask() })
                </span>
            </div>
            <div className="d-flex px-2 mb-2">
                <CustomInput type="checkbox" id="checkbox3" label="Clothing" inline />
                <span className="small ml-auto align-self-center">
                    ({ faker.finance.mask() })
                </span>
            </div>
            <div className="d-flex px-2 mb-2">
                <CustomInput type="checkbox" id="checkbox4" label="Games" inline />
                <span className="small ml-auto align-self-center">
                    ({ faker.finance.mask() })
                </span>
            </div>
        </Nav>
        { /* END Tags */}
        { /* START Price */}
        <Nav vertical className="mb-3">
            <div className="mb-2">
                <Link href="#" className="small d-flex px-1">
                    <span>
                        Price
                    </span>
                    <i className="fa fa-angle-down align-self-center ml-auto"></i>
                </Link>
            </div>
            <div className="d-flex p-0">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        $
                    </InputGroupAddon>
                    <Input placeholder="Min: 5" className="bg-white" />
                    <Input placeholder="Max: 87" className="bg-white" />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary" outline>
                            <i className="fa fa-check"></i>
                        </Button>
                    </InputGroupAddon> 
                </InputGroup>
            </div>
        </Nav>
        { /* END Price */}
        { /* START Shipping */}
        <Nav vertical className="mb-3">
            <div className="mb-2">
                <Link href="#" className="small d-flex px-1">
                    <span>
                        Shipping
                    </span>
                    <i className="fa fa-angle-down align-self-center ml-auto"></i>
                </Link>
            </div>
            <div className="d-flex p-0">
                <CustomInput type="select" name="select" id="shipping">
                    <option>England</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Other...</option>
                </CustomInput>
            </div>
        </Nav>
        { /* END Shipping */}
        { /* START Sales */}
        <Nav vertical className="mb-4">
            <div className="mb-2">
                <Link href="#" className="small d-flex px-1">
                    <span>
                        Sales
                    </span>
                    <i className="fa fa-angle-down align-self-center ml-auto"></i>
                </Link>
            </div>
            <div className="d-flex p-0">
                <CustomInput type="select" name="select" id="sales">
                    <option>England</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Other...</option>
                </CustomInput>
            </div>
        </Nav>
        { /* END Sales */}
        <Button color="primary" block>
            Confirm Changes
        </Button>
        <Button color="link" block>
            Reset to Default
        </Button>
    </React.Fragment>
)

export { SearchResultsLeftNav };
