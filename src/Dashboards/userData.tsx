import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserData = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, [localStorage.getItem("role")]);
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const RandomId = () => `id-${Math.random()}`;
  const handleItemClick = (text: string, hasSubItems: boolean) => {
    if (!hasSubItems) {
      handleNavigation(text.toLowerCase()); // Navigate if no sub-items
    }
  };

  const UserData = [
    {
      text: "Home",
    },
    {
      text: "Tasks",
      subItems: [{ text: "People" }, { text: "Organization" }],
    },

    ...(role === "sales" ? [{ text: "Leads" }] : []),
    // {
    //   text: "Organizations",
    // },
    // {
    //   text: "Time",
    // },
    // {
    //   text: "Emails",
    // },
  ];
  return (
    <div>
      <SimpleTreeView>
        {UserData.map((item, index) => {
          return (
            <TreeItem
              sx={{
                cursor: "pointer",
                color: "white",
                ":hover": { backgroundColor: "primary.dark" },
                ":active": { backgroundColor: "primary.light" },
              }}
              itemId={RandomId()}
              label={item.text}
              key={index}
              onClick={() => handleItemClick(item.text, !!item.subItems)}
            >
              {item.subItems?.map((subItem, subIndex) => {
                return (
                  <TreeItem
                    key={subIndex}
                    sx={{
                      cursor: "pointer",
                      color: "white",
                      ":hover": { backgroundColor: "primary.dark" },
                      ":active": { backgroundColor: "primary.light" },
                    }}
                    itemId={RandomId()}
                    label={subItem.text}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleNavigation(subItem.text.toLowerCase());
                    }}
                  />
                );
              })}
            </TreeItem>
          );
        })}
      </SimpleTreeView>
    </div>
  );
};

export default UserData;
