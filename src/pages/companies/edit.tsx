import { SelectOptionWithAvatar } from "@/components";
import { CustomAvatar } from "@/components/custom-avatar";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/constants";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import { UsersSelectQuery } from "@/graphql/types";
import { getNameInitials } from "@/utilities";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { CompanyContactsTable } from "./contacts-table";

export const EditPage = () => {
  const { saveButtonProps, formLoading, formProps, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });
  const { avatarUrl, name } = queryResult?.data?.data || {};
  const { selectProps, queryResult: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
    pagination: { mode: "off" },
  });
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name || "")}
                style={{ width: 96, height: 96, marginBottom: "24px" }}
              />
              <Form.Item
                label="Sales Owner"
                name="salesOwnerId"
                initialValue={formProps.initialValues?.salesOwner?.id}
              >
                <Select
                  {...selectProps}
                  options={
                    queryResultUsers.data?.data.map((user) => ({
                      value: user.id,
                      label: (
                        <SelectOptionWithAvatar
                          name={user.name}
                          avatarUrl={user.avatarUrl ?? undefined}
                        />
                      ),
                    })) ?? []
                  }
                  placeholder="Select Sales Owner"
                />
              </Form.Item>
              <Form.Item>
                <Select options={companySizeOptions} />
              </Form.Item>
              <Form.Item>
                <InputNumber
                  autoFocus
                  addonBefore="$"
                  min={0}
                  placeholder="0,00"
                />
              </Form.Item>
              <Form.Item label="Industry">
                <Select options={industryOptions} />
              </Form.Item>
              <Form.Item label="Business Type">
                <Select options={businessTypeOptions} />
              </Form.Item>
              <Form.Item label="Country">
                <Input placeholder="country" name="country" />
              </Form.Item>
              <Form.Item label="Website">
                <Input placeholder="website" name="website" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col xs={24} xl={12}>
          <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
};
