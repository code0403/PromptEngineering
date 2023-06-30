import tkinter as tk
from tkinter import ttk

snack_inventory = {}  # Dictionary to store snack inventory (snack_id: {name, price, availability})
sales_record = {}  # Dictionary to store sales record (snack_id: quantity)

def add_snack():
    snack_id = entry_id.get()
    name = entry_name.get()
    price = float(entry_price.get())
    availability = var_availability.get()

    snack_inventory[snack_id] = {"name": name, "price": price, "availability": availability}
    lbl_status.config(text=f"Snack with ID {snack_id} added to the inventory.")

def remove_snack():
    snack_id = entry_id.get()
    if snack_id in snack_inventory:
        del snack_inventory[snack_id]
        lbl_status.config(text=f"Snack with ID {snack_id} removed from the inventory.")
    else:
        lbl_status.config(text=f"No snack with ID {snack_id} found in the inventory.")

def display_inventory():
    inventory_text = "Current Snack Inventory:\n\n"
    for snack_id, details in snack_inventory.items():
        inventory_text += f"ID: {snack_id}\nName: {details['name']}\nPrice: {details['price']}\nAvailability: {details['availability']}\n\n"
    lbl_status.config(text=inventory_text)

def record_sale():
    snack_id = entry_id.get()
    if snack_id in snack_inventory:
        quantity = int(entry_quantity.get())
        if quantity <= 0:
            lbl_status.config(text="Invalid quantity. Please enter a positive number.")
        elif snack_inventory[snack_id]["availability"] == "no":
            lbl_status.config(f"The snack {snack_inventory[snack_id]['name']} is not available.")
        elif quantity > 0:
            snack_inventory[snack_id]["availability"] = "no"
            if snack_id in sales_record:
                sales_record[snack_id] += quantity
            else:
                sales_record[snack_id] = quantity
            lbl_status.config(text=f"{quantity} {snack_inventory[snack_id]['name']}(s) sold.")
    else:
        lbl_status.config(text=f"No snack with ID {snack_id} found in the inventory.")

# Create the GUI application window
window = tk.Tk()
window.title("Snack Inventory Management System")

# Create and configure UI elements
frame_input = ttk.Frame(window, padding=20)
frame_input.pack()

label_id = ttk.Label(frame_input, text="Snack ID:")
label_id.grid(row=0, column=0, sticky="e")
entry_id = ttk.Entry(frame_input)
entry_id.grid(row=0, column=1)

label_name = ttk.Label(frame_input, text="Snack Name:")
label_name.grid(row=1, column=0, sticky="e")
entry_name = ttk.Entry(frame_input)
entry_name.grid(row=1, column=1)

label_price = ttk.Label(frame_input, text="Snack Price:")
label_price.grid(row=2, column=0, sticky="e")
entry_price = ttk.Entry(frame_input)
entry_price.grid(row=2, column=1)

label_availability = ttk.Label(frame_input, text="Availability:")
label_availability.grid(row=3, column=0, sticky="e")
var_availability = tk.StringVar(window)
var_availability.set("yes")
radio_yes = ttk.Radiobutton(frame_input, text="Yes", variable=var_availability, value="yes")
radio_yes.grid(row=3, column=1, sticky="w")
radio_no = ttk.Radiobutton(frame_input, text="No", variable=var_availability, value="no")
radio_no.grid(row=3, column=1, sticky="e")

btn_add = ttk.Button(window, text="Add Snack", command=add_snack)
btn_add.pack(pady=10)
btn_remove = ttk.Button(window, text="Remove Snack", command=remove_snack)
btn_remove.pack(pady=5)
btn_display = ttk.Button(window, text="Display Inventory", command=display_inventory)
btn_display.pack(pady=5)

frame_sale = ttk.Frame(window, padding=20)
frame_sale.pack()

label_quantity = ttk.Label(frame_sale, text="Quantity Sold:")
label_quantity.grid(row=0, column=0, sticky="e")
entry_quantity = ttk.Entry(frame_sale)
entry_quantity.grid(row=0, column=1)

btn_sale = ttk.Button(frame_sale, text="Record Sale", command=record_sale)
btn_sale.grid(row=0, column=2, padx=5)
lbl_status = ttk.Label(window, text="")
lbl_status.pack(pady=10)

# Start the GUI event loop
window.mainloop()
